
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  Mail,
  Image as ImageIcon,
  Wand2,
  Palette
} from 'lucide-react';

import { GoogleGenAI } from '@google/genai';
import { logOut } from '../../firebase';

interface AdminDashboardProps {
  state: AppState;
  onUpdate: (newState: Partial<AppState>) => void;
  onLogout: () => void;
}

const DB_FILENAME = 'statvion_db.json';

const AdminDashboard: React.FC<AdminDashboardProps> = ({ state, onUpdate, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'content' | 'services' | 'cloud' | 'seo' | 'responses' | 'media' | 'appearance'>('cloud');
  const [tempContent, setTempContent] = useState(state.content);
  const [tempImages, setTempImages] = useState(state.images);
  const [tempTheme, setTempTheme] = useState(state.theme || { fontFamily: 'Inter, sans-serif', fontSize: '16px' });
  const [tempSeo, setTempSeo] = useState(state.seo || { metaTitle: '', metaDescription: '' });
  const [generatingImage, setGeneratingImage] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [tokenClient, setTokenClient] = useState<any>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // Initialize Google Identity Services
  useEffect(() => {
    const initGsi = () => {
      if (typeof window !== 'undefined' && (window as any).google) {
        const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
        
        if (!clientId) {
          console.warn('VITE_GOOGLE_CLIENT_ID is not set in environment variables.');
        }

        const client = (window as any).google.accounts.oauth2.initTokenClient({
          client_id: clientId || 'MISSING_CLIENT_ID',
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

  const handleLogout = async () => {
    try {
      await logOut();
      onLogout();
      window.navigate(RoutePath.HOME);
    } catch (error) {
      console.error('Failed to log out', error);
    }
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

  const generateImage = async (key: string, prompt: string, size: '1K' | '2K' | '4K') => {
    try {
      setGeneratingImage(key);
      const hasKey = await (window as any).aistudio?.hasSelectedApiKey();
      if (!hasKey) {
        await (window as any).aistudio?.openSelectKey();
      }
      
      const apiKey = (typeof process !== 'undefined' ? process.env.API_KEY : '') || import.meta.env.VITE_GEMINI_API_KEY || '';
      if (!apiKey) {
        alert("API key is required to generate images.");
        setGeneratingImage(null);
        return;
      }

      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-image-preview',
        contents: {
          parts: [{ text: prompt }]
        },
        config: {
          imageConfig: {
            aspectRatio: "1:1",
            imageSize: size
          }
        }
      });

      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          const base64EncodeString = part.inlineData.data;
          const imageUrl = `data:${part.inlineData.mimeType};base64,${base64EncodeString}`;
          const newImages = { ...tempImages, [key]: imageUrl };
          setTempImages(newImages);
          onUpdate({ images: newImages });
          setShowToast(true);
          break;
        }
      }
    } catch (err) {
      console.error("Image generation failed", err);
      alert("Failed to generate image. Please ensure you have selected a valid API key.");
    } finally {
      setGeneratingImage(null);
    }
  };

  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white text-slate-900 flex flex-col shrink-0 fixed h-full z-20 border-r border-slate-200">
        <div className="p-8 border-b border-slate-200">
          <a href={RoutePath.HOME} className="text-xl font-bold flex items-center gap-2 hover:opacity-80 transition-opacity">
            {tempImages.logoUrl ? (
              <img src={tempImages.logoUrl} alt="Logo" className="h-8 object-contain" referrerPolicy="no-referrer" />
            ) : (
              <><Settings className="text-blue-500" /> STATVION CMS</>
            )}
          </a>
        </div>
        
        <nav className="flex-grow p-6 space-y-2">
          <button onClick={() => setActiveTab('content')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'content' ? 'bg-slate-800 text-white' : 'hover:bg-slate-100'}`}>
            <FileText size={20} /> Page Content
          </button>
          <button onClick={() => setActiveTab('services')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'services' ? 'bg-slate-800 text-white' : 'hover:bg-slate-100'}`}>
            <LayoutDashboard size={20} /> Services
          </button>
          <button onClick={() => setActiveTab('cloud')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'cloud' ? 'bg-slate-800 text-white' : 'hover:bg-slate-100'}`}>
            <CloudIcon size={20} /> Google Drive Sync
          </button>
          <button onClick={() => setActiveTab('seo')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'seo' ? 'bg-slate-800 text-white' : 'hover:bg-slate-100'}`}>
            <Search size={20} /> SEO & Marketing
          </button>
          <button onClick={() => setActiveTab('responses')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'responses' ? 'bg-slate-800 text-white' : 'hover:bg-slate-100'}`}>
            <Mail size={20} /> Contact Responses
            {state.responses.length > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="ml-auto bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full"
              >
                {state.responses.length}
              </motion.span>
            )}
          </button>
          <button onClick={() => setActiveTab('media')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'media' ? 'bg-slate-800 text-white' : 'hover:bg-slate-100'}`}>
            <ImageIcon size={20} /> Site Logo & Media
          </button>
          <button onClick={() => setActiveTab('appearance')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'appearance' ? 'bg-slate-800 text-white' : 'hover:bg-slate-100'}`}>
            <Palette size={20} /> Appearance
          </button>
        </nav>

        <div className="p-6 border-t border-slate-200">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 transition-colors">
            <LogOut size={20} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="ml-64 flex-grow p-10 relative">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-10">
            <h1 className="text-3xl font-extrabold text-slate-900 capitalize tracking-tighter">
              {activeTab === 'cloud' ? 'Cloud Database' : activeTab}
            </h1>
            <div className="flex gap-4">
              <a href={RoutePath.HOME} target="_blank" className="flex items-center gap-2 px-6 py-2 bg-slate-100 text-slate-900 font-bold rounded-lg hover:bg-slate-200 transition-all">
                <Monitor size={18} /> Visit Site
              </a>
              <AnimatePresence>
                {(activeTab === 'content' || activeTab === 'appearance' || activeTab === 'seo') && (
                  <motion.button 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    onClick={() => {
                      if (activeTab === 'content') handleSaveContent();
                      if (activeTab === 'appearance') {
                        onUpdate({ theme: tempTheme });
                        setShowToast(true);
                        setTimeout(() => setShowToast(false), 3000);
                      }
                      if (activeTab === 'seo') {
                        onUpdate({ seo: tempSeo });
                        setShowToast(true);
                        setTimeout(() => setShowToast(false), 3000);
                      }
                    }} 
                    className="flex items-center gap-2 px-6 py-2 bg-slate-800 text-white font-bold rounded-lg hover:bg-blue-700 shadow-lg shadow-blue-200"
                  >
                    <Save size={18} /> Save Changes
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {/* TAB: CONTENT */}
            {activeTab === 'content' && (
              <motion.div 
                key="content"
                variants={tabVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-8 bg-slate-900 p-10 rounded-[2.5rem] shadow-sm border border-slate-800"
              >
                <div className="grid grid-cols-1 gap-8">
                  <div>
                    <label className="block text-sm font-bold text-slate-400 mb-3">Hero Headline</label>
                    <textarea 
                      value={tempContent.heroTitle}
                      onChange={(e) => setTempContent({...tempContent, heroTitle: e.target.value})}
                      className="w-full px-5 py-4 rounded-2xl border border-slate-700 bg-slate-800 text-white outline-none focus:ring-4 focus:ring-blue-900/50 transition-all text-xl font-semibold"
                      rows={2}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-400 mb-3">Hero Subtitle</label>
                    <textarea 
                      value={tempContent.heroSubtitle}
                      onChange={(e) => setTempContent({...tempContent, heroSubtitle: e.target.value})}
                      className="w-full px-5 py-4 rounded-2xl border border-slate-700 bg-slate-800 text-slate-300 outline-none focus:ring-4 focus:ring-blue-900/50 transition-all"
                      rows={3}
                    />
                  </div>
                  <div className="h-px bg-slate-800 my-4"></div>
                  <div>
                    <label className="block text-sm font-bold text-slate-400 mb-3">About STATVION</label>
                    <textarea 
                      value={tempContent.aboutText}
                      onChange={(e) => setTempContent({...tempContent, aboutText: e.target.value})}
                      className="w-full px-5 py-4 rounded-2xl border border-slate-700 bg-slate-800 text-slate-300 outline-none focus:ring-4 focus:ring-blue-900/50 transition-all"
                      rows={5}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-sm font-bold text-slate-400 mb-3">Our Vision</label>
                      <textarea 
                        value={tempContent.vision}
                        onChange={(e) => setTempContent({...tempContent, vision: e.target.value})}
                        className="w-full px-5 py-4 rounded-2xl border border-slate-700 bg-slate-800 text-slate-300 outline-none focus:ring-4 focus:ring-blue-900/50 transition-all"
                        rows={3}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-400 mb-3">Our Mission</label>
                      <textarea 
                        value={tempContent.mission}
                        onChange={(e) => setTempContent({...tempContent, mission: e.target.value})}
                        className="w-full px-5 py-4 rounded-2xl border border-slate-700 bg-slate-800 text-slate-300 outline-none focus:ring-4 focus:ring-blue-900/50 transition-all"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB: SERVICES */}
            {activeTab === 'services' && (
              <motion.div 
                key="services"
                variants={tabVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-6"
              >
                <div className="flex justify-end">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={addService} 
                    className="bg-slate-100 text-slate-900 px-8 py-4 rounded-2xl font-bold flex items-center gap-3 hover:bg-slate-200 transition-all shadow-xl shadow-slate-200"
                  >
                    <Plus size={20} /> Create Service
                  </motion.button>
                </div>
                <div className="grid grid-cols-1 gap-6">
                  <AnimatePresence>
                    {state.services.map((service, i) => (
                      <motion.div 
                        key={service.id} 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3, delay: i * 0.05 }}
                        className="bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-800 flex flex-col md:flex-row gap-8 items-start group hover:border-blue-500/50 transition-all"
                      >
                        <div className="flex-grow w-full space-y-4">
                          <div className="flex flex-col md:flex-row gap-4">
                            <input 
                              type="text" 
                              value={service.title} 
                              onChange={(e) => updateService(service.id, { title: e.target.value })}
                              className="flex-grow font-bold text-xl px-4 py-2 border border-slate-800 bg-slate-950 text-white rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                              placeholder="Service Title"
                            />
                            <select 
                              value={service.category}
                              onChange={(e) => updateService(service.id, { category: e.target.value as any })}
                              className="px-4 py-2 border border-slate-800 bg-slate-950 text-white rounded-xl font-semibold"
                            >
                              <option value="it">IT Solutions</option>
                              <option value="consultancy">Consultancy</option>
                              <option value="development">Development</option>
                            </select>
                          </div>
                          <textarea 
                            value={service.description}
                            onChange={(e) => updateService(service.id, { description: e.target.value })}
                            className="w-full px-4 py-3 border border-slate-800 bg-slate-950 text-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                            rows={2}
                            placeholder="Service description..."
                          />
                        </div>
                        <div className="flex md:flex-col gap-2">
                          <button onClick={() => deleteService(service.id)} className="p-4 bg-red-900/30 text-red-400 rounded-2xl hover:bg-red-900/50 transition-all">
                            <Trash2 size={24} />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}

            {/* TAB: CLOUD SYNC */}
            {activeTab === 'cloud' && (
              <motion.div 
                key="cloud"
                variants={tabVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-8"
              >
                <div className="bg-slate-900 p-12 rounded-[3rem] shadow-sm border border-slate-800">
                  <div className="flex items-start justify-between mb-12">
                    <div className="flex gap-8">
                      <div className="w-24 h-24 bg-slate-800 rounded-3xl flex items-center justify-center text-white shadow-2xl shadow-blue-900/20">
                        <CloudIcon size={48} />
                      </div>
                      <div>
                        <h2 className="text-3xl font-extrabold text-white mb-2">Google Drive Database</h2>
                        <p className="text-slate-400 text-lg max-w-lg leading-relaxed">
                          Securely store your website's content in your personal Google Drive. No external database costs, 100% ownership.
                        </p>
                      </div>
                    </div>
                    <div className={`px-6 py-2 rounded-full text-sm font-bold flex items-center gap-3 ${accessToken ? 'bg-green-900/30 text-green-400' : 'bg-slate-800 text-slate-400'}`}>
                      <div className={`w-3 h-3 rounded-full ${accessToken ? 'bg-green-500' : 'bg-slate-500 animate-pulse'}`}></div>
                      {accessToken ? 'Active Session' : 'No Connection'}
                    </div>
                  </div>

                  {!accessToken ? (
                    <div className="bg-slate-800 border-2 border-dashed border-slate-700 p-16 rounded-[2.5rem] text-center">
                      <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-slate-700">
                        <Database className="text-blue-500" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4">Connect Google Account</h3>
                      <p className="text-slate-400 mb-10 max-w-sm mx-auto text-lg">
                        Authorize access to create a private <code className="bg-blue-900/30 text-blue-400 px-2 py-0.5 rounded font-bold">statvion_db.json</code> file in your Drive.
                      </p>
                      <button 
                        onClick={authenticate}
                        className="bg-slate-900 text-white border border-slate-700 px-12 py-5 rounded-2xl font-bold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center gap-4 mx-auto text-lg"
                      >
                        <img src="https://www.google.com/favicon.ico" className="w-6 h-6" alt="Google" />
                        Sign in with Google
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="p-10 bg-slate-800 rounded-[2.5rem] hover:bg-slate-700 border-2 border-transparent hover:border-blue-500 hover:shadow-2xl transition-all cursor-pointer group" onClick={syncToCloud}>
                        <div className="flex items-center gap-6 mb-8">
                          <div className="w-16 h-16 bg-slate-800 text-white rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                            <ArrowUpCircle size={32} />
                          </div>
                          <h4 className="text-2xl font-bold text-white">Push to Cloud</h4>
                        </div>
                        <p className="text-slate-400 mb-8 leading-relaxed">
                          Upload your local changes to Google Drive. This updates the live version of your site database.
                        </p>
                        <button disabled={syncing} className="w-full bg-slate-800 text-white font-bold py-5 rounded-2xl flex items-center justify-center gap-3 shadow-lg shadow-blue-900/20 disabled:opacity-50">
                          {syncing ? <RefreshCw className="animate-spin" /> : <Save size={20} />}
                          {syncing ? 'Uploading...' : 'Save to Drive'}
                        </button>
                      </div>

                      <div className="p-10 bg-slate-800 rounded-[2.5rem] hover:bg-slate-700 border-2 border-transparent hover:border-orange-500 hover:shadow-2xl transition-all cursor-pointer group" onClick={pullFromCloud}>
                        <div className="flex items-center gap-6 mb-8">
                          <div className="w-16 h-16 bg-orange-500 text-white rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                            <ArrowDownCircle size={32} />
                          </div>
                          <h4 className="text-2xl font-bold text-white">Pull from Cloud</h4>
                        </div>
                        <p className="text-slate-400 mb-8 leading-relaxed">
                          Download the latest data from your Drive. This is useful if you edit from multiple computers.
                        </p>
                        <button disabled={syncing} className="w-full bg-slate-900 text-white font-bold py-5 rounded-2xl flex items-center justify-center gap-3 shadow-lg shadow-slate-900/20 disabled:opacity-50 border border-slate-700">
                          {syncing ? <RefreshCw className="animate-spin" /> : <RefreshCw size={20} />}
                          {syncing ? 'Downloading...' : 'Import Backup'}
                        </button>
                      </div>
                    </div>
                  )}

                  {state.cloudConfig.lastSync && (
                    <div className="mt-12 pt-8 border-t border-slate-800 flex items-center justify-between">
                      <div className="flex items-center gap-3 text-slate-400 font-medium">
                        <Check size={20} className="text-green-500" />
                        Sync Status: All changes backed up
                      </div>
                      <div className="text-slate-500 text-sm">
                        Last update: {new Date(state.cloudConfig.lastSync).toLocaleString()}
                      </div>
                    </div>
                  )}
                </div>

                {state.cloudConfig.isEnabled && (
                  <div className="bg-slate-800 p-10 rounded-[2.5rem] text-white flex items-start gap-8 relative overflow-hidden shadow-2xl shadow-blue-200">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2"></div>
                    <AlertCircle size={40} className="shrink-0 text-blue-100" />
                    <div className="relative z-10">
                      <h4 className="text-2xl font-bold mb-3">One Final Step for Public Site</h4>
                      <p className="text-blue-100 text-lg leading-relaxed mb-6">
                        To make your changes visible to everyone automatically, find the <code className="bg-blue-500 px-2 rounded font-bold">statvion_db.json</code> file in your Google Drive, right-click it, and set Share to <strong>"Anyone with the link can view"</strong>.
                      </p>
                      <button className="bg-white text-slate-800 px-8 py-3 rounded-xl font-bold hover:bg-blue-50 transition-all flex items-center gap-2">
                        Learn how to share <Monitor size={18} />
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* TAB: SEO */}
            {activeTab === 'seo' && (
              <motion.div 
                key="seo"
                variants={tabVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="bg-slate-900 p-12 rounded-[2.5rem] shadow-sm border border-slate-800"
              >
                <h3 className="text-2xl font-bold mb-8 text-white">Search Engine Optimization</h3>
                <div className="space-y-6 max-w-2xl">
                  <div>
                    <label className="block text-sm font-bold text-slate-400 mb-2">Meta Title</label>
                    <input 
                      type="text" 
                      value={tempSeo.metaTitle}
                      onChange={(e) => setTempSeo({ ...tempSeo, metaTitle: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-700 bg-slate-800 text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
                      placeholder="STATVION | End-to-End IT Services" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-400 mb-2">Meta Description</label>
                    <textarea 
                      value={tempSeo.metaDescription}
                      onChange={(e) => setTempSeo({ ...tempSeo, metaDescription: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-700 bg-slate-800 text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
                      rows={4} 
                      placeholder="Expert IT consultancy and software development..." 
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB: RESPONSES */}
            {activeTab === 'responses' && (
              <motion.div 
                key="responses"
                variants={tabVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-6"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold text-slate-900">Inbound Inquiries</h3>
                  {state.responses.length > 0 && (
                    <button 
                      onClick={() => {
                        if(confirm('Clear all responses?')) onUpdate({ responses: [] });
                      }}
                      className="text-red-500 font-bold flex items-center gap-2 hover:bg-red-100 px-4 py-2 rounded-xl transition-all"
                    >
                      <Trash2 size={18} /> Clear All
                    </button>
                  )}
                </div>
                
                {state.responses.length === 0 ? (
                  <div className="bg-slate-900 p-20 rounded-[3rem] text-center border border-slate-800">
                    <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 border border-slate-700">
                      <Mail size={40} className="text-slate-500" />
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2">No responses yet</h4>
                    <p className="text-slate-400">When users fill out your contact form, they will appear here.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-6">
                    <AnimatePresence>
                      {state.responses.map((res, i) => (
                        <motion.div 
                          key={res.id} 
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.3, delay: i * 0.05 }}
                          className="bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-800 hover:border-blue-500/50 transition-all group"
                        >
                          <div className="flex justify-between items-start mb-6">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-400 font-bold text-xl">
                                {res.name.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <h4 className="font-bold text-white text-lg">{res.name}</h4>
                                <p className="text-slate-400 text-sm flex items-center gap-2">
                                  <Mail size={14} /> {res.email}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-xs text-slate-500 font-medium mb-2">
                                {new Date(res.timestamp).toLocaleString()}
                              </p>
                              <button 
                                onClick={() => onUpdate({ responses: state.responses.filter(r => r.id !== res.id) })}
                                className="p-2 text-slate-500 hover:text-red-400 transition-colors"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </div>
                          <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                            <p className="font-bold text-white mb-2">{res.subject}</p>
                            <p className="text-slate-300 leading-relaxed italic">"{res.message}"</p>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </motion.div>
            )}

            {/* TAB: Media */}
            {activeTab === 'media' && (
              <motion.div 
                key="media"
                variants={tabVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-6"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-slate-900">Media & Images</h3>
                  <p className="text-slate-600">Manage site logo and generate high-quality images using Gemini 3.1 Pro</p>
                </div>

                <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200 mb-8">
                  <h4 className="text-xl font-bold text-slate-900 mb-4">Site Logo</h4>
                  <p className="text-slate-600 mb-6">Provide a URL to an image to replace the default STATVION logo. Leave empty to use the default logo.</p>
                  <div className="flex flex-col lg:flex-row gap-8 items-start">
                    <div className="w-full lg:w-1/3 shrink-0">
                      <div className="h-32 rounded-2xl overflow-hidden bg-slate-50 border border-slate-200 relative flex items-center justify-center p-4">
                        {tempImages.logoUrl ? (
                          <img src={tempImages.logoUrl} alt="Site Logo" className="max-w-full max-h-full object-contain" referrerPolicy="no-referrer" />
                        ) : (
                          <div className="text-slate-400 font-bold flex items-center gap-2">
                            <ImageIcon size={24} /> Default Logo
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex-grow w-full space-y-4">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Upload Logo Image</label>
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                const base64String = reader.result as string;
                                const newImages = { ...tempImages, logoUrl: base64String };
                                setTempImages(newImages);
                                onUpdate({ images: newImages });
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 outline-none focus:ring-2 focus:ring-blue-500 transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
                        />
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="h-px bg-slate-200 flex-grow"></div>
                        <span className="text-slate-400 text-sm font-bold">OR</span>
                        <div className="h-px bg-slate-200 flex-grow"></div>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Logo Image URL</label>
                        <input 
                          type="text" 
                          value={tempImages.logoUrl || ''}
                          onChange={(e) => {
                            const newImages = { ...tempImages, logoUrl: e.target.value };
                            setTempImages(newImages);
                            onUpdate({ images: newImages });
                          }}
                          className="w-full px-4 py-3 rounded-xl border border-slate-700 bg-slate-950 text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                          placeholder="https://example.com/my-logo.png"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200 mb-8">
                  <h4 className="text-xl font-bold text-slate-900 mb-4">Site Favicon</h4>
                  <p className="text-slate-600 mb-6">Provide a URL to an image to replace the default favicon. Leave empty to use the default.</p>
                  <div className="flex flex-col lg:flex-row gap-8 items-start">
                    <div className="w-full lg:w-1/3 shrink-0">
                      <div className="h-32 rounded-2xl overflow-hidden bg-slate-50 border border-slate-200 relative flex items-center justify-center p-4">
                        {tempImages.faviconUrl ? (
                          <img src={tempImages.faviconUrl} alt="Site Favicon" className="max-w-full max-h-full object-contain" referrerPolicy="no-referrer" />
                        ) : (
                          <div className="text-slate-400 font-bold flex items-center gap-2">
                            <ImageIcon size={24} /> Default Favicon
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex-grow w-full space-y-4">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Upload Favicon Image</label>
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                const base64String = reader.result as string;
                                const newImages = { ...tempImages, faviconUrl: base64String };
                                setTempImages(newImages);
                                onUpdate({ images: newImages });
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 outline-none focus:ring-2 focus:ring-blue-500 transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
                        />
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="h-px bg-slate-200 flex-grow"></div>
                        <span className="text-slate-400 text-sm font-bold">OR</span>
                        <div className="h-px bg-slate-200 flex-grow"></div>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Favicon Image URL</label>
                        <input 
                          type="text" 
                          value={tempImages.faviconUrl || ''}
                          onChange={(e) => {
                            const newImages = { ...tempImages, faviconUrl: e.target.value };
                            setTempImages(newImages);
                            onUpdate({ images: newImages });
                          }}
                          className="w-full px-4 py-3 rounded-xl border border-slate-700 bg-slate-950 text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                          placeholder="https://example.com/my-favicon.ico"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-8">
                  {[
                    { key: 'homeStrategy', label: 'Home Page Strategy Image', defaultPrompt: 'A futuristic business strategy meeting with holographic data visualizations, cinematic lighting' },
                    { key: 'aboutHero', label: 'About Page Hero Image', defaultPrompt: 'A modern, sleek office environment with diverse professionals collaborating, high-end photography' },
                    { key: 'contactMap', label: 'Contact Page Map Image', defaultPrompt: 'An abstract, artistic digital map with glowing nodes representing global connectivity, dark theme' }
                  ].map((img) => (
                    <div key={img.key} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200 flex flex-col lg:flex-row gap-8">
                      <div className="w-full lg:w-1/3 shrink-0">
                        <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-50 border border-slate-200 relative group">
                          <img src={tempImages[img.key as keyof typeof tempImages]} alt={img.label} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          {generatingImage === img.key && (
                            <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex flex-col items-center justify-center text-slate-900">
                              <RefreshCw className="animate-spin mb-2" size={32} />
                              <span className="font-bold">Generating...</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex-grow space-y-4">
                        <h4 className="text-xl font-bold text-slate-900">{img.label}</h4>
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2">Image Prompt</label>
                          <textarea 
                            id={`prompt-${img.key}`}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            rows={3}
                            defaultValue={img.defaultPrompt}
                          />
                        </div>
                        <div className="flex flex-wrap gap-4 items-end">
                          <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Resolution</label>
                            <select 
                              id={`size-${img.key}`}
                              className="px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 outline-none focus:ring-2 focus:ring-blue-500 transition-all font-semibold"
                            >
                              <option value="1K">1K (Standard)</option>
                              <option value="2K">2K (High)</option>
                              <option value="4K">4K (Ultra)</option>
                            </select>
                          </div>
                          <button 
                            onClick={() => {
                              const prompt = (document.getElementById(`prompt-${img.key}`) as HTMLTextAreaElement).value;
                              const size = (document.getElementById(`size-${img.key}`) as HTMLSelectElement).value as '1K' | '2K' | '4K';
                              generateImage(img.key, prompt, size);
                            }}
                            disabled={generatingImage !== null}
                            className="bg-slate-800 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-blue-900/20 hover:bg-blue-700 transition-all flex items-center gap-2 disabled:opacity-50"
                          >
                            <Wand2 size={18} /> Generate New Image
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* TAB: APPEARANCE */}
            {activeTab === 'appearance' && (
              <motion.div 
                key="appearance"
                variants={tabVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-8"
              >
                <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-200">
                  <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <Palette className="text-blue-500" /> Typography Settings
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Global Font Family</label>
                      <select 
                        value={tempTheme.fontFamily}
                        onChange={(e) => setTempTheme({ ...tempTheme, fontFamily: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      >
                        <option value="Inter, sans-serif">Inter (Default, Modern)</option>
                        <option value="'Space Grotesk', sans-serif">Space Grotesk (Tech, Geometric)</option>
                        <option value="'Playfair Display', serif">Playfair Display (Elegant, Serif)</option>
                        <option value="'JetBrains Mono', monospace">JetBrains Mono (Technical, Code)</option>
                        <option value="system-ui, sans-serif">System Default</option>
                      </select>
                      <p className="text-xs text-slate-500 mt-2">Changes the primary font used throughout the website.</p>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Base Font Size</label>
                      <select 
                        value={tempTheme.fontSize}
                        onChange={(e) => setTempTheme({ ...tempTheme, fontSize: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      >
                        <option value="14px">Small (14px)</option>
                        <option value="16px">Medium / Default (16px)</option>
                        <option value="18px">Large (18px)</option>
                        <option value="20px">Extra Large (20px)</option>
                      </select>
                      <p className="text-xs text-slate-500 mt-2">Adjusts the overall scale of text across the site.</p>
                    </div>
                  </div>

                  <div className="mt-8 p-6 bg-slate-50 rounded-2xl border border-slate-200">
                    <h4 className="text-sm font-bold text-slate-500 mb-4 uppercase tracking-wider">Live Preview</h4>
                    <div 
                      className="space-y-4" 
                      style={{ 
                        fontFamily: tempTheme.fontFamily,
                        fontSize: tempTheme.fontSize
                      }}
                    >
                      <h1 className="text-4xl font-bold text-slate-900">Heading 1 Example</h1>
                      <h2 className="text-2xl font-semibold text-slate-800">Heading 2 Example</h2>
                      <p className="text-slate-600 leading-relaxed">
                        This is a paragraph demonstrating the selected font family and base font size. 
                        The quick brown fox jumps over the lazy dog. 1234567890
                      </p>
                      <button className="bg-slate-800 text-white px-6 py-2 rounded-lg font-medium">
                        Button Text
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Floating Toast Notification */}
        <AnimatePresence>
          {showToast && (
            <motion.div 
              initial={{ opacity: 0, y: 50, x: 50 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, y: 50, x: 50 }}
              className="fixed bottom-12 right-12 bg-white text-slate-900 border border-slate-200 px-8 py-5 rounded-2xl shadow-2xl flex items-center gap-4 z-50"
            >
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white">
                <Check size={18} />
              </div>
              <span className="font-bold text-lg">Changes synchronized!</span>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default AdminDashboard;
