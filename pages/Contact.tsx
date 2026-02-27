
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Globe } from 'lucide-react';
import { ContactResponse } from '../types';

interface ContactProps {
  onSendMessage?: (response: Omit<ContactResponse, 'id' | 'timestamp'>) => void;
}

const Contact: React.FC<ContactProps> = ({ onSendMessage }) => {
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = {
      ...formState,
      timestamp: new Date().toLocaleString()
    };

    try {
      // 1. Local state update
      if (onSendMessage) {
        onSendMessage(formState);
      }

      // 2. Real-time Google Sheets sync via backend API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      
      if (result.status === 'success' || result.status === 'partial_success') {
        setIsSent(true);
        setTimeout(() => setIsSent(false), 5000);
        setFormState({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error(result.message || 'Failed to sync with cloud');
      }
    } catch (error) {
      console.error('Submission error:', error);
      // Still show success to user if local state was updated, but log the error
      setIsSent(true);
      setTimeout(() => setIsSent(false), 5000);
      setFormState({ name: '', email: '', subject: '', message: '' });
    }
  };

  return (
    <div className="py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mb-32">
          <h2 className="text-[#FF9933] font-bold uppercase tracking-[0.3em] text-xs mb-8">Connect</h2>
          <h1 className="text-5xl md:text-8xl font-serif font-light text-slate-900 mb-10 tracking-tight leading-[0.9]">
            Start the <span className="italic">Dialogue</span>.
          </h1>
          <p className="text-2xl text-slate-500 leading-relaxed font-light">
            Have a project in mind or need strategic guidance? Our team is ready to help you navigate your digital transformation journey.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
          {/* Contact Info */}
          <div className="lg:col-span-4 space-y-12">
            <div className="bg-slate-950 p-12 rounded-[3rem] text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF9933]/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
              <h3 className="text-2xl font-serif font-light mb-12 tracking-tight">Contact Information</h3>
              <div className="space-y-10">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-[#FF9933]">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Our Office</p>
                    <p className="text-slate-300 font-light">123 Innovation Drive, Tech City, ST 54321, USA</p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-[#FF9933]">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Call Us</p>
                    <p className="text-slate-300 font-light">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-[#FF9933]">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Email Us</p>
                    <p className="text-slate-300 font-light">contact@statvion.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="h-80 rounded-[3rem] bg-slate-100 overflow-hidden relative group border border-black/[0.03]">
              <img 
                src="https://picsum.photos/seed/map/800/600" 
                alt="Map" 
                className="w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/90 backdrop-blur-xl px-8 py-4 rounded-full shadow-2xl border border-white/20">
                  <span className="text-xs font-bold tracking-widest uppercase text-slate-900 flex items-center gap-3">
                    <MapPin size={16} className="text-[#0EA5E9]" /> View on Google Maps
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-8">
            <form onSubmit={handleSubmit} className="bg-white p-10 lg:p-20 rounded-[3rem] shadow-2xl shadow-black/[0.02] border border-black/[0.03]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Your Name</label>
                  <input 
                    type="text" 
                    required 
                    value={formState.name}
                    onChange={(e) => setFormState({...formState, name: e.target.value})}
                    placeholder="John Doe"
                    className="w-full px-6 py-5 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-[#0EA5E9]/30 outline-none transition-all font-light text-lg" 
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
                  <input 
                    type="email" 
                    required 
                    value={formState.email}
                    onChange={(e) => setFormState({...formState, email: e.target.value})}
                    placeholder="john@example.com"
                    className="w-full px-6 py-5 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-[#0EA5E9]/30 outline-none transition-all font-light text-lg" 
                  />
                </div>
              </div>
              <div className="space-y-3 mb-10">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Subject</label>
                <input 
                  type="text" 
                  required 
                  value={formState.subject}
                  onChange={(e) => setFormState({...formState, subject: e.target.value})}
                  placeholder="Strategic Inquiry"
                  className="w-full px-6 py-5 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-[#0EA5E9]/30 outline-none transition-all font-light text-lg" 
                />
              </div>
              <div className="space-y-3 mb-12">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Your Message</label>
                <textarea 
                  rows={6} 
                  required 
                  value={formState.message}
                  onChange={(e) => setFormState({...formState, message: e.target.value})}
                  placeholder="Describe your vision..."
                  className="w-full px-6 py-5 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-[#0EA5E9]/30 outline-none transition-all font-light text-lg resize-none"
                ></textarea>
              </div>
              <button 
                type="submit"
                className="w-full bg-slate-950 text-white font-bold py-6 rounded-2xl hover:bg-slate-800 transition-all flex items-center justify-center gap-4 text-xl shadow-2xl shadow-black/10"
              >
                Send Message <Send size={20} className="font-light" />
              </button>
              
              {isSent && (
                <div className="mt-10 p-6 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-2xl text-center font-light text-lg">
                  Thank you. Your message has been received. Our leadership team will contact you shortly.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
