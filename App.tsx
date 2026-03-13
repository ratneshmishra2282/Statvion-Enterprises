
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

declare global {
  interface Window {
    navigate: (path: string) => void;
  }
}

window.navigate = (path: string) => {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
};

const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<string>(window.location.pathname === '/' ? RoutePath.HOME : window.location.pathname);
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
    if (state.images.faviconUrl) {
      let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
      }
      link.href = state.images.faviconUrl;
    }
  }, [state.images.faviconUrl]);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname === '/' ? RoutePath.HOME : window.location.pathname);
      window.scrollTo(0, 0);
    };
    window.addEventListener('popstate', handlePopState);

    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor && anchor.href) {
        const url = new URL(anchor.href);
        if (
          url.origin === window.location.origin &&
          anchor.target !== '_blank' &&
          !anchor.hasAttribute('download') &&
          !e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey
        ) {
          const hrefAttr = anchor.getAttribute('href');
          if (hrefAttr === '#') {
            e.preventDefault();
            return;
          }
          e.preventDefault();
          window.navigate(url.pathname + url.search + url.hash);
        }
      }
    };
    document.addEventListener('click', handleGlobalClick);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      document.removeEventListener('click', handleGlobalClick);
    };
  }, []);

  useEffect(() => {
    if (state.theme) {
      document.documentElement.style.fontSize = state.theme.fontSize;
      document.documentElement.style.fontFamily = state.theme.fontFamily;
    }
  }, [state.theme]);

  useEffect(() => {
    if (state.seo) {
      document.title = state.seo.metaTitle;
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', state.seo.metaDescription);
    }
  }, [state.seo]);

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
