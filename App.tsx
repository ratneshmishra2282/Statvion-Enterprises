
import React, { useState, useEffect, useCallback } from 'react';
import { RoutePath, AppState } from './types';
import { loadAppState, saveAppState } from './store';
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

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPath(window.location.hash.slice(1) || RoutePath.HOME);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

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
        return <Home content={state.content} services={state.services} />;
      case RoutePath.ABOUT:
        return <About content={state.content} />;
      case RoutePath.SERVICES:
        return <ServicesPage services={state.services} />;
      case RoutePath.SECTORS:
        return <Sectors />;
      case RoutePath.CONTACT:
        return (
          <Contact 
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
        return <AdminLogin onLogin={() => updateState({ isLoggedIn: true })} />;
      case RoutePath.ADMIN_DASHBOARD:
        return state.isLoggedIn ? (
          <AdminDashboard 
            state={state} 
            onUpdate={updateState} 
            onLogout={() => updateState({ isLoggedIn: false })} 
          />
        ) : (
          <AdminLogin onLogin={() => updateState({ isLoggedIn: true })} />
        );
      default:
        return <Home content={state.content} services={state.services} />;
    }
  };

  const isCMSPage = currentPath.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col">
      {!isCMSPage && <Navbar />}
      <main className={`flex-grow ${!isCMSPage ? 'pt-20' : ''}`}>
        {renderPage()}
      </main>
      {!isCMSPage && <Footer />}
    </div>
  );
};

export default App;
