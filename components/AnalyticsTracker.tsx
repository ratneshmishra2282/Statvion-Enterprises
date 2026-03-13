import React, { useEffect, useRef } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

interface AnalyticsTrackerProps {
  currentPath: string;
}

const AnalyticsTracker: React.FC<AnalyticsTrackerProps> = ({ currentPath }) => {
  const startTimeRef = useRef<number>(Date.now());
  const pathRef = useRef<string>(currentPath);
  const sessionIdRef = useRef<string>('');
  const ipRef = useRef<string>('Unknown');

  useEffect(() => {
    // Initialize session ID
    let sessionId = sessionStorage.getItem('statvion_session_id');
    if (!sessionId) {
      sessionId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      sessionStorage.setItem('statvion_session_id', sessionId);
    }
    sessionIdRef.current = sessionId;

    // Fetch IP
    fetch('https://api.ipify.org?format=json')
      .then(res => res.json())
      .then(data => {
        if (data && data.ip) {
          ipRef.current = data.ip;
        }
      })
      .catch(err => console.error('Failed to fetch IP', err));
  }, []);

  const recordAnalytics = async (path: string, timeSpent: number) => {
    // Ignore very short bounces
    if (timeSpent < 1) return;

    const ua = navigator.userAgent;
    let browser = 'Unknown';
    if (ua.includes('Firefox')) browser = 'Firefox';
    else if (ua.includes('SamsungBrowser')) browser = 'Samsung Internet';
    else if (ua.includes('Opera') || ua.includes('OPR')) browser = 'Opera';
    else if (ua.includes('Trident') || ua.includes('MSIE')) browser = 'Internet Explorer';
    else if (ua.includes('Edge') || ua.includes('Edg')) browser = 'Edge';
    else if (ua.includes('Chrome')) browser = 'Chrome';
    else if (ua.includes('Safari')) browser = 'Safari';

    let os = 'Unknown';
    if (ua.includes('Win')) os = 'Windows';
    else if (ua.includes('Mac')) os = 'macOS';
    else if (ua.includes('Linux')) os = 'Linux';
    else if (ua.includes('Android')) os = 'Android';
    else if (ua.includes('like Mac')) os = 'iOS';

    let device = 'Desktop';
    if (/Mobi|Android/i.test(ua)) device = 'Mobile';
    if (/Tablet|iPad/i.test(ua)) device = 'Tablet';

    try {
      await addDoc(collection(db, 'analytics'), {
        sessionId: sessionIdRef.current,
        ip: ipRef.current,
        os,
        browser,
        device,
        path,
        timeSpent,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Failed to record analytics', error);
    }
  };

  useEffect(() => {
    if (pathRef.current !== currentPath) {
      const timeSpent = Math.round((Date.now() - startTimeRef.current) / 1000);
      recordAnalytics(pathRef.current, timeSpent);
      
      pathRef.current = currentPath;
      startTimeRef.current = Date.now();
    }
  }, [currentPath]);

  useEffect(() => {
    const handleUnload = () => {
      const timeSpent = Math.round((Date.now() - startTimeRef.current) / 1000);
      recordAnalytics(pathRef.current, timeSpent);
    };
    window.addEventListener('beforeunload', handleUnload);
    return () => window.removeEventListener('beforeunload', handleUnload);
  }, []);

  return null;
};

export default AnalyticsTracker;
