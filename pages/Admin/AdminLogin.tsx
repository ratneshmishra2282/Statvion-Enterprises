
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { RoutePath } from '../../types';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { signInWithGoogle, logOut } from '../../firebase';

interface AdminLoginProps {
  onLogin: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const ALLOWED_EMAILS = ['ratnesh2282@gmail.com'];

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError('');
    try {
      const user = await signInWithGoogle();
      if (user && user.email && ALLOWED_EMAILS.includes(user.email)) {
        onLogin();
        window.location.hash = RoutePath.ADMIN_DASHBOARD;
      } else {
        await logOut();
        setError('Unauthorized access. Only authorized administrators can sign in.');
      }
    } catch (err: any) {
      console.error(err);
      setError(`Authentication failed: ${err.message || 'Please try again.'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 relative overflow-hidden">
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.15, 0.1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 -left-4 w-[500px] h-[500px] bg-[#FF9933] rounded-full mix-blend-multiply filter blur-[120px]"
      />
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-0 -right-4 w-[500px] h-[500px] bg-[#0EA5E9] rounded-full mix-blend-multiply filter blur-[120px]"
      />

      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute top-8 left-8 z-10"
      >
        <a href={`#${RoutePath.HOME}`} className="text-slate-900 flex items-center gap-2 opacity-70 hover:opacity-100 transition-all">
          <ArrowLeft size={20} /> Back to Website
        </a>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-10">
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl font-bold text-slate-900 mb-2"
          >
            CMS Portal
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-slate-600"
          >
            Sign in to manage your content
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-slate-50 border border-slate-200 p-10 rounded-[2rem] shadow-xl relative overflow-hidden text-center"
        >
          <div className="w-20 h-20 bg-blue-600/10 border border-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-8 text-blue-600">
            <ShieldCheck size={40} />
          </div>
          
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Enterprise Access</h2>
          <p className="text-slate-600 mb-8">
            Authenticate using your corporate Google account to access the CMS dashboard.
          </p>

          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-6 p-4 bg-red-500/10 border border-red-500/50 text-red-200 rounded-xl text-sm"
            >
              {error}
            </motion.div>
          )}

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-3 disabled:opacity-70"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            {isLoading ? 'Authenticating...' : 'Sign in with Google'}
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
