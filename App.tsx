
import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { RoutePath, AppState } from './types';
import { loadAppState, saveAppState } from './store';
import { auth, logOut } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import ServicesPage from './pages/ServicesPage';
import Sectors from './pages/Sectors';
import Contact from './pages/Contact';
import AdminLogin from './pages/Admin/AdminLogin';
import AdminDashboard from './pages/Admin/AdminDashboard';

const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<string>(window.location.hash.slice(1) || RoutePath.HOME);
  const [state, setState] = useState<AppState>(loadAppState());
  const [isAuthReady, setIsAuthReady] = useState(false);

  const ALLOWED_EMAILS = ['ratnesh2282@gmail.com'];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user && user.email && ALLOWED_EMAILS.includes(user.email)) {
        setState(prev => ({ ...prev, isLoggedIn: true }));
      } else {
        if (user) {
          await logOut();
        }
        setState(prev => ({ ...prev, isLoggedIn: false }));
      }
      setIsAuthReady(true);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPath(window.location.hash.slice(1) || RoutePath.HOME);
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    if (state.theme) {
      document.documentElement.style.fontSize = state.theme.fontSize;
      document.documentElement.style.fontFamily = state.theme.fontFamily;
    }
  }, [state.theme]);

  const updateState = useCallback((newState: Partial<AppState>) => {
    setState(prev => {
      const updated = { ...prev, ...newState };
      saveAppState(updated);
      return updated;
    });
  }, []);

  const renderPage = () => {
    switch (currentPath) {
      case RoutePath.HOME:
        return <Home content={state.content} services={state.services} images={state.images} />;
      case RoutePath.ABOUT:
        return <About content={state.content} images={state.images} />;
      case RoutePath.SERVICES:
        return <ServicesPage services={state.services} />;
      case RoutePath.SECTORS:
        return <Sectors />;
      case RoutePath.CONTACT:
        return (
          <Contact 
            images={state.images}
            onSendMessage={(data) => {
              const newResponse = {
                ...data,
                id: Date.now().toString(),
                timestamp: new Date().toISOString()
              };
              updateState({ responses: [newResponse, ...state.responses] });
            }} 
          />
        );
      case RoutePath.ADMIN_LOGIN:
        return <AdminLogin onLogin={() => {}} />;
      case RoutePath.ADMIN_DASHBOARD:
        if (!isAuthReady) return <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>;
        return state.isLoggedIn ? (
          <AdminDashboard 
            state={state} 
            onUpdate={updateState} 
            onLogout={() => {}} 
          />
        ) : (
          <AdminLogin onLogin={() => {}} />
        );
      default:
        return <Home content={state.content} services={state.services} />;
    }
  };

  const isCMSPage = currentPath.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col">
      {!isCMSPage && <Navbar logoUrl={state.images?.logoUrl} />}
      <main className={`flex-grow ${!isCMSPage ? 'pt-20' : ''}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPath}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>
      {!isCMSPage && <Footer logoUrl={state.images?.logoUrl} />}
    </div>
  );
};

export default App;
