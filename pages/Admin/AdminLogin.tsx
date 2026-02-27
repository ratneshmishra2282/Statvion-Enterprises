
import React, { useState } from 'react';
import { RoutePath } from '../../types';
import { Lock, User, ArrowLeft } from 'lucide-react';

interface AdminLoginProps {
  onLogin: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Use environment variables for credentials, fallback to default if not set
    const validUsername = import.meta.env.VITE_ADMIN_USERNAME || 'admin';
    const validPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123';

    if (username === validUsername && password === validPassword) {
      onLogin();
      window.location.hash = RoutePath.ADMIN_DASHBOARD;
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
      <div className="absolute top-8 left-8">
        <a href={`#${RoutePath.HOME}`} className="text-white flex items-center gap-2 opacity-70 hover:opacity-100 transition-all">
          <ArrowLeft size={20} /> Back to Website
        </a>
      </div>
      
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-white mb-2">CMS Portal</h1>
          <p className="text-slate-400">Sign in to manage your content</p>
        </div>

        <form onSubmit={handleLogin} className="glass-effect p-8 rounded-[2rem] shadow-2xl">
          {error && <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 text-red-200 rounded-xl text-sm">{error}</div>}
          
          <div className="mb-6">
            <label className="block text-slate-300 text-sm font-bold mb-2">Username</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-4 pl-12 pr-4 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="admin"
              />
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-slate-300 text-sm font-bold mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-4 pl-12 pr-4 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-900/40"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
