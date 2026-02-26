
import React, { useState, useEffect, useCallback } from 'react';
import { AppState, RoutePath, Service } from '../../types';
import { 
  LayoutDashboard, 
  FileText, 
  Settings, 
  Plus, 
  LogOut, 
  Save, 
  Trash2,
  Monitor,
  Search,
  Check,
  Cloud as CloudIcon,
  RefreshCw,
  AlertCircle,
  Database,
  ArrowUpCircle,
  ArrowDownCircle,
  Mail
} from 'lucide-react';

interface AdminDashboardProps {
  state: AppState;
  onUpdate: (newState: Partial<AppState>) => void;
  onLogout: () => void;
}

const DB_FILENAME = 'statvion_db.json';

const AdminDashboard: React.FC<AdminDashboardProps> = ({ state, onUpdate, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'content' | 'services' | 'cloud' | 'seo' | 'responses'>('content');
  const [tempContent, setTempContent] = useState(state.content);
  const [showToast, setShowToast] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [tokenClient, setTokenClient] = useState<any>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // Initialize Google Identity Services
  useEffect(() => {
    const initGsi = () => {
      if (typeof window !== 'undefined' && (window as any).google) {
        const client = (window as any).google.accounts.oauth2.initTokenClient({
          client_id: 'YOUR_CLIENT_ID_HERE.apps.googleusercontent.com', // MUST BE REPLACED BY USER
          scope: 'https://www.googleapis.com/auth/drive.file',
          callback: (response: any) => {
            if (response.access_token) {
              setAccessToken(response.access_token);
              onUpdate({ cloudConfig: { ...state.cloudConfig, isEnabled: true } });
            }
          },
        });
        setTokenClient(client);
      }
    };
    
    const checkGapi = setInterval(() => {
      if ((window as any).google) {
        initGsi();
        clearInterval(checkGapi);
      }
    }, 500);
    return () => clearInterval(checkGapi);
  }, []);

  const handleLogout = () => {
    onLogout();
    window.location.hash = RoutePath.HOME;
  };

  const handleSaveContent = () => {
    onUpdate({ content: tempContent });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const addService = () => {
    const newService: Service = {
      id: Date.now().toString(),
      title: 'New Service',
      description: 'Describe this service here...',
      icon: 'Cpu',
      category: 'it'
    };
    onUpdate({ services: [...state.services, newService] });
  };

  const updateService = (id: string, updates: Partial<Service>) => {
    onUpdate({
      services: state.services.map(s => s.id === id ? { ...s, ...updates } : s)
    });
  };

  const deleteService = (id: string) => {
    if(confirm('Are you sure you want to delete this service?')) {
      onUpdate({ services: state.services.filter(s => s.id !== id) });
    }
  };

  // ACTUAL GOOGLE DRIVE FUNCTIONS
  const authenticate = () => {
    if (tokenClient) tokenClient.requestAccessToken();
  };

  const syncToCloud = async () => {
    if (!accessToken) {
      authenticate();
      return;
    }
    
    setSyncing(true);
    try {
      const metadata = {
        name: DB_FILENAME,
        mimeType: 'application/json',
      };
      
      const fileData = JSON.stringify({
        content: state.content,
        services: state.services
      });

      const form = new FormData();
      form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
      form.append('file', new Blob([fileData], { type: 'application/json' }));

      // If we have an existing file ID, update it, otherwise create new
      const url = state.cloudConfig.fileId 
        ? `https://www.googleapis.com/upload/drive/v3/files/${state.cloudConfig.fileId}?uploadType=multipart`
        : 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart';
      
      const method = state.cloudConfig.fileId ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: { Authorization: `Bearer ${accessToken}` },
        body: form,
      });

      const result = await response.json();
      if (result.id) {
        onUpdate({ 
          cloudConfig: { 
            ...state.cloudConfig, 
            fileId: result.id, 
            lastSync: new Date().toISOString() 
          } 
        });
        setShowToast(true);
      }
    } catch (err) {
      console.error('Sync failed', err);
      alert('Cloud Sync Failed. Check your connection.');
    } finally {
      setSyncing(false);
    }
  };

  const pullFromCloud = async () => {
    if (!accessToken) {
      authenticate();
      return;
    }

    setSyncing(true);
    try {
      // 1. Find the file if we don't have an ID
      let fileId = state.cloudConfig.fileId;
      if (!fileId) {
        const listRes = await fetch(`https://www.googleapis.com/drive/v3/files?q=name='${DB_FILENAME}'`, {
          headers: { Authorization: `Bearer ${accessToken}` }
        });
        const list = await listRes.json();
        if (list.files && list.files.length > 0) {
          fileId = list.files[0].id;
        }
      }

      if (!fileId) {
        alert('No backup file found in your Drive.');
        return;
      }

      // 2. Download the file
      const downloadRes = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      const data = await downloadRes.json();
      
      if (data.content && data.services) {
        onUpdate({ 
          content: data.content, 
          services: data.services,
          cloudConfig: { ...state.cloudConfig, fileId, lastSync: new Date().toISOString() }
        });
        setTempContent(data.content);
        setShowToast(true);
      }
    } catch (err) {
      console.error('Pull failed', err);
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col shrink-0 fixed h-full">
        <div className="p-8 border-b border-slate-800">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Settings className="text-blue-500" /> STATVION CMS
          </h2>
        </div>
        
        <nav className="flex-grow p-6 space-y-2">
          <button onClick={() => setActiveTab('content')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'content' ? 'bg-blue-600' : 'hover:bg-slate-800'}`}>
            <FileText size={20} /> Page Content
          </button>
          <button onClick={() => setActiveTab('services')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'services' ? 'bg-blue-600' : 'hover:bg-slate-800'}`}>
            <LayoutDashboard size={20} /> Services
          </button>
          <button onClick={() => setActiveTab('cloud')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'cloud' ? 'bg-blue-600' : 'hover:bg-slate-800'}`}>
            <CloudIcon size={20} /> Google Drive Sync
          </button>
          <button onClick={() => setActiveTab('seo')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'seo' ? 'bg-blue-600' : 'hover:bg-slate-800'}`}>
            <Search size={20} /> SEO & Marketing
          </button>
          <button onClick={() => setActiveTab('responses')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'responses' ? 'bg-blue-600' : 'hover:bg-slate-800'}`}>
            <Mail size={20} /> Contact Responses
            {state.responses.length > 0 && (
              <span className="ml-auto bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                {state.responses.length}
              </span>
            )}
          </button>
        </nav>

        <div className="p-6 border-t border-slate-800">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 transition-colors">
            <LogOut size={20} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="ml-64 flex-grow p-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-10">
            <h1 className="text-3xl font-extrabold text-slate-900 capitalize tracking-tight">
              {activeTab === 'cloud' ? 'Cloud Database' : activeTab}
            </h1>
            <div className="flex gap-4">
              <a href={`#${RoutePath.HOME}`} target="_blank" className="flex items-center gap-2 px-6 py-2 bg-slate-200 text-slate-700 font-bold rounded-lg hover:bg-slate-300 transition-all">
                <Monitor size={18} /> Visit Site
              </a>
              {activeTab === 'content' && (
                <button onClick={handleSaveContent} className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 shadow-lg shadow-blue-200">
                  <Save size={18} /> Save Changes
                </button>
              )}
            </div>
          </div>

          {/* TAB: CONTENT */}
          {activeTab === 'content' && (
            <div className="space-y-8 bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-200 animate-in fade-in duration-500">
              <div className="grid grid-cols-1 gap-8">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3">Hero Headline</label>
                  <textarea 
                    value={tempContent.heroTitle}
                    onChange={(e) => setTempContent({...tempContent, heroTitle: e.target.value})}
                    className="w-full px-5 py-4 rounded-2xl border border-slate-200 outline-none focus:ring-4 focus:ring-blue-50 transition-all text-xl font-semibold"
                    rows={2}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3">Hero Subtitle</label>
                  <textarea 
                    value={tempContent.heroSubtitle}
                    onChange={(e) => setTempContent({...tempContent, heroSubtitle: e.target.value})}
                    className="w-full px-5 py-4 rounded-2xl border border-slate-200 outline-none focus:ring-4 focus:ring-blue-50 transition-all text-slate-600"
                    rows={3}
                  />
                </div>
                <div className="h-px bg-slate-100 my-4"></div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3">About STATVION</label>
                  <textarea 
                    value={tempContent.aboutText}
                    onChange={(e) => setTempContent({...tempContent, aboutText: e.target.value})}
                    className="w-full px-5 py-4 rounded-2xl border border-slate-200 outline-none focus:ring-4 focus:ring-blue-50 transition-all"
                    rows={5}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-3">Our Vision</label>
                    <textarea 
                      value={tempContent.vision}
                      onChange={(e) => setTempContent({...tempContent, vision: e.target.value})}
                      className="w-full px-5 py-4 rounded-2xl border border-slate-200 outline-none focus:ring-4 focus:ring-blue-50 transition-all bg-slate-50"
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-3">Our Mission</label>
                    <textarea 
                      value={tempContent.mission}
                      onChange={(e) => setTempContent({...tempContent, mission: e.target.value})}
                      className="w-full px-5 py-4 rounded-2xl border border-slate-200 outline-none focus:ring-4 focus:ring-blue-50 transition-all bg-slate-50"
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: SERVICES */}
          {activeTab === 'services' && (
            <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
              <div className="flex justify-end">
                <button onClick={addService} className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 hover:bg-slate-800 transition-all shadow-xl shadow-slate-200">
                  <Plus size={20} /> Create Service
                </button>
              </div>
              <div className="grid grid-cols-1 gap-6">
                {state.services.map((service) => (
                  <div key={service.id} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 flex flex-col md:flex-row gap-8 items-start group hover:border-blue-200 transition-all">
                    <div className="flex-grow w-full space-y-4">
                      <div className="flex flex-col md:flex-row gap-4">
                        <input 
                          type="text" 
                          value={service.title} 
                          onChange={(e) => updateService(service.id, { title: e.target.value })}
                          className="flex-grow font-bold text-xl px-4 py-2 border border-slate-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                          placeholder="Service Title"
                        />
                        <select 
                          value={service.category}
                          onChange={(e) => updateService(service.id, { category: e.target.value as any })}
                          className="px-4 py-2 border border-slate-100 rounded-xl font-semibold bg-slate-50"
                        >
                          <option value="it">IT Solutions</option>
                          <option value="consultancy">Consultancy</option>
                          <option value="development">Development</option>
                        </select>
                      </div>
                      <textarea 
                        value={service.description}
                        onChange={(e) => updateService(service.id, { description: e.target.value })}
                        className="w-full px-4 py-3 border border-slate-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-600"
                        rows={2}
                        placeholder="Service description..."
                      />
                    </div>
                    <div className="flex md:flex-col gap-2">
                      <button onClick={() => deleteService(service.id)} className="p-4 bg-red-50 text-red-500 rounded-2xl hover:bg-red-100 transition-all">
                        <Trash2 size={24} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: CLOUD SYNC */}
          {activeTab === 'cloud' && (
            <div className="space-y-8 animate-in zoom-in-95 duration-500">
              <div className="bg-white p-12 rounded-[3rem] shadow-sm border border-slate-200">
                <div className="flex items-start justify-between mb-12">
                  <div className="flex gap-8">
                    <div className="w-24 h-24 bg-blue-600 rounded-3xl flex items-center justify-center text-white shadow-2xl shadow-blue-200">
                      <CloudIcon size={48} />
                    </div>
                    <div>
                      <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Google Drive Database</h2>
                      <p className="text-slate-500 text-lg max-w-lg leading-relaxed">
                        Securely store your website's content in your personal Google Drive. No external database costs, 100% ownership.
                      </p>
                    </div>
                  </div>
                  <div className={`px-6 py-2 rounded-full text-sm font-bold flex items-center gap-3 ${accessToken ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                    <div className={`w-3 h-3 rounded-full ${accessToken ? 'bg-green-500' : 'bg-slate-400 animate-pulse'}`}></div>
                    {accessToken ? 'Active Session' : 'No Connection'}
                  </div>
                </div>

                {!accessToken ? (
                  <div className="bg-slate-50 border-2 border-dashed border-slate-200 p-16 rounded-[2.5rem] text-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                      <Database className="text-blue-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-4">Connect Google Account</h3>
                    <p className="text-slate-500 mb-10 max-w-sm mx-auto text-lg">
                      Authorize access to create a private <code className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-bold">statvion_db.json</code> file in your Drive.
                    </p>
                    <button 
                      onClick={authenticate}
                      className="bg-white text-slate-700 border border-slate-200 px-12 py-5 rounded-2xl font-bold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center gap-4 mx-auto text-lg"
                    >
                      <img src="https://www.google.com/favicon.ico" className="w-6 h-6" alt="Google" />
                      Sign in with Google
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="p-10 bg-slate-50 rounded-[2.5rem] hover:bg-white border-2 border-transparent hover:border-blue-500 hover:shadow-2xl transition-all cursor-pointer group" onClick={syncToCloud}>
                      <div className="flex items-center gap-6 mb-8">
                        <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                          <ArrowUpCircle size={32} />
                        </div>
                        <h4 className="text-2xl font-bold">Push to Cloud</h4>
                      </div>
                      <p className="text-slate-500 mb-8 leading-relaxed">
                        Upload your local changes to Google Drive. This updates the live version of your site database.
                      </p>
                      <button disabled={syncing} className="w-full bg-blue-600 text-white font-bold py-5 rounded-2xl flex items-center justify-center gap-3 shadow-lg shadow-blue-100 disabled:opacity-50">
                        {syncing ? <RefreshCw className="animate-spin" /> : <Save size={20} />}
                        {syncing ? 'Uploading...' : 'Save to Drive'}
                      </button>
                    </div>

                    <div className="p-10 bg-slate-50 rounded-[2.5rem] hover:bg-white border-2 border-transparent hover:border-orange-500 hover:shadow-2xl transition-all cursor-pointer group" onClick={pullFromCloud}>
                      <div className="flex items-center gap-6 mb-8">
                        <div className="w-16 h-16 bg-orange-500 text-white rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                          <ArrowDownCircle size={32} />
                        </div>
                        <h4 className="text-2xl font-bold">Pull from Cloud</h4>
                      </div>
                      <p className="text-slate-500 mb-8 leading-relaxed">
                        Download the latest data from your Drive. This is useful if you edit from multiple computers.
                      </p>
                      <button disabled={syncing} className="w-full bg-slate-900 text-white font-bold py-5 rounded-2xl flex items-center justify-center gap-3 shadow-lg shadow-slate-200 disabled:opacity-50">
                        {syncing ? <RefreshCw className="animate-spin" /> : <RefreshCw size={20} />}
                        {syncing ? 'Downloading...' : 'Import Backup'}
                      </button>
                    </div>
                  </div>
                )}

                {state.cloudConfig.lastSync && (
                  <div className="mt-12 pt-8 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-3 text-slate-400 font-medium">
                      <Check size={20} className="text-green-500" />
                      Sync Status: All changes backed up
                    </div>
                    <div className="text-slate-400 text-sm">
                      Last update: {new Date(state.cloudConfig.lastSync).toLocaleString()}
                    </div>
                  </div>
                )}
              </div>

              {state.cloudConfig.isEnabled && (
                <div className="bg-blue-600 p-10 rounded-[2.5rem] text-white flex items-start gap-8 relative overflow-hidden shadow-2xl shadow-blue-200">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2"></div>
                  <AlertCircle size={40} className="shrink-0 text-blue-100" />
                  <div className="relative z-10">
                    <h4 className="text-2xl font-bold mb-3">One Final Step for Public Site</h4>
                    <p className="text-blue-100 text-lg leading-relaxed mb-6">
                      To make your changes visible to everyone automatically, find the <code className="bg-blue-500 px-2 rounded font-bold">statvion_db.json</code> file in your Google Drive, right-click it, and set Share to <strong>"Anyone with the link can view"</strong>.
                    </p>
                    <button className="bg-white text-blue-600 px-8 py-3 rounded-xl font-bold hover:bg-blue-50 transition-all flex items-center gap-2">
                      Learn how to share <Monitor size={18} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB: SEO */}
          {activeTab === 'seo' && (
            <div className="bg-white p-12 rounded-[2.5rem] shadow-sm border border-slate-200">
              <h3 className="text-2xl font-bold mb-8">Search Engine Optimization</h3>
              <div className="space-y-6 max-w-2xl">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Meta Title</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200" placeholder="STATVION | End-to-End IT Services" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Meta Description</label>
                  <textarea className="w-full px-4 py-3 rounded-xl border border-slate-200" rows={3} placeholder="Expert IT consultancy and software development..." />
                </div>
                <button className="bg-blue-600 text-white px-10 py-4 rounded-xl font-bold shadow-lg shadow-blue-100">Update Marketing Settings</button>
              </div>
            </div>
          )}

          {/* TAB: RESPONSES */}
          {activeTab === 'responses' && (
            <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold text-slate-900">Inbound Inquiries</h3>
                {state.responses.length > 0 && (
                  <button 
                    onClick={() => {
                      if(confirm('Clear all responses?')) onUpdate({ responses: [] });
                    }}
                    className="text-red-500 font-bold flex items-center gap-2 hover:bg-red-50 px-4 py-2 rounded-xl transition-all"
                  >
                    <Trash2 size={18} /> Clear All
                  </button>
                )}
              </div>
              
              {state.responses.length === 0 ? (
                <div className="bg-white p-20 rounded-[3rem] text-center border border-slate-200">
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Mail size={40} className="text-slate-300" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-800 mb-2">No responses yet</h4>
                  <p className="text-slate-500">When users fill out your contact form, they will appear here.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6">
                  {state.responses.map((res) => (
                    <div key={res.id} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 hover:border-blue-200 transition-all group">
                      <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 font-bold text-xl">
                            {res.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900 text-lg">{res.name}</h4>
                            <p className="text-slate-500 text-sm flex items-center gap-2">
                              <Mail size={14} /> {res.email}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-slate-400 font-medium mb-2">
                            {new Date(res.timestamp).toLocaleString()}
                          </p>
                          <button 
                            onClick={() => onUpdate({ responses: state.responses.filter(r => r.id !== res.id) })}
                            className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                      <div className="bg-slate-50 p-6 rounded-2xl">
                        <p className="font-bold text-slate-800 mb-2">{res.subject}</p>
                        <p className="text-slate-600 leading-relaxed italic">"{res.message}"</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Floating Toast Notification */}
        {showToast && (
          <div className="fixed bottom-12 right-12 bg-slate-900 text-white px-8 py-5 rounded-2xl shadow-2xl flex items-center gap-4 animate-in slide-in-from-right-10 z-50">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <Check size={18} />
            </div>
            <span className="font-bold text-lg">Changes synchronized!</span>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
