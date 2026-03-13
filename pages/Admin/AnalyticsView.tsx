import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../../firebase';
import { AnalyticsRecord } from '../../types';
import { Monitor, Smartphone, Globe, Clock, Users, Activity } from 'lucide-react';

const AnalyticsView: React.FC = () => {
  const [records, setRecords] = useState<AnalyticsRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const q = query(collection(db, 'analytics'), orderBy('timestamp', 'desc'), limit(1000));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as AnalyticsRecord));
        setRecords(data);
      } catch (error) {
        console.error('Failed to fetch analytics', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return <div className="text-center py-20 text-slate-500">Loading analytics data...</div>;
  }

  // Calculate metrics
  const totalViews = records.length;
  const uniqueVisitors = new Set(records.map(r => r.sessionId)).size;
  const avgTimeSpent = records.length > 0 
    ? Math.round(records.reduce((acc, r) => acc + (r.timeSpent || 0), 0) / records.length)
    : 0;

  // Top Pages
  const pageCounts = records.reduce((acc, r) => {
    acc[r.path] = (acc[r.path] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const topPages = Object.entries(pageCounts).sort((a, b) => b[1] - a[1]).slice(0, 5);

  // Devices
  const deviceCounts = records.reduce((acc, r) => {
    acc[r.device] = (acc[r.device] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Browsers
  const browserCounts = records.reduce((acc, r) => {
    acc[r.browser] = (acc[r.browser] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-200">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
              <Activity size={24} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Total Page Views</p>
              <h3 className="text-3xl font-black text-slate-900">{totalViews}</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-200">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center">
              <Users size={24} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Unique Visitors</p>
              <h3 className="text-3xl font-black text-slate-900">{uniqueVisitors}</h3>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-200">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center">
              <Clock size={24} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Avg Time Spent</p>
              <h3 className="text-3xl font-black text-slate-900">{avgTimeSpent}s</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200">
          <h4 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <Globe className="text-blue-500" /> Top Pages
          </h4>
          <div className="space-y-4">
            {topPages.map(([path, count]) => (
              <div key={path} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                <span className="font-medium text-slate-700">{path}</span>
                <span className="font-bold text-slate-900">{count} views</span>
              </div>
            ))}
            {topPages.length === 0 && <p className="text-slate-500">No data available yet.</p>}
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200">
          <h4 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <Smartphone className="text-blue-500" /> Devices & Browsers
          </h4>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h5 className="text-sm font-bold text-slate-500 mb-4 uppercase tracking-wider">Devices</h5>
              <div className="space-y-3">
                {Object.entries(deviceCounts).map(([device, count]) => (
                  <div key={device} className="flex items-center justify-between">
                    <span className="text-slate-700">{device}</span>
                    <span className="font-bold text-slate-900">{count}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h5 className="text-sm font-bold text-slate-500 mb-4 uppercase tracking-wider">Browsers</h5>
              <div className="space-y-3">
                {Object.entries(browserCounts).map(([browser, count]) => (
                  <div key={browser} className="flex items-center justify-between">
                    <span className="text-slate-700">{browser}</span>
                    <span className="font-bold text-slate-900">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200">
        <h4 className="text-xl font-bold text-slate-900 mb-6">Recent Activity</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 text-sm">
                <th className="pb-4 font-bold">Time</th>
                <th className="pb-4 font-bold">Path</th>
                <th className="pb-4 font-bold">IP Address</th>
                <th className="pb-4 font-bold">Device / Browser</th>
                <th className="pb-4 font-bold">Duration</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {records.slice(0, 20).map((record, i) => (
                <tr key={record.id || i} className="border-b border-slate-100 last:border-0">
                  <td className="py-4 text-slate-600">{new Date(record.timestamp).toLocaleString()}</td>
                  <td className="py-4 font-medium text-slate-900">{record.path}</td>
                  <td className="py-4 text-slate-500">{record.ip}</td>
                  <td className="py-4 text-slate-600">{record.device} / {record.browser}</td>
                  <td className="py-4 text-slate-600">{record.timeSpent}s</td>
                </tr>
              ))}
            </tbody>
          </table>
          {records.length === 0 && <p className="text-slate-500 text-center py-8">No activity recorded yet.</p>}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsView;
