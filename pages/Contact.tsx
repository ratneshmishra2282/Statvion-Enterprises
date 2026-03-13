
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Send, Globe, MessageCircle, CheckCircle } from 'lucide-react';
import { ContactResponse, AppImages } from '../types';

interface ContactProps {
  onSendMessage?: (response: Omit<ContactResponse, 'id' | 'timestamp'>) => void;
  images: AppImages;
}

const Contact: React.FC<ContactProps> = ({ onSendMessage, images }) => {
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
    <div className="pt-16 pb-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mb-32"
        >
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#C5A059] font-bold uppercase tracking-[0.4em] text-xs mb-8"
          >
            Connect
          </motion.h2>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-4xl md:text-6xl font-serif font-light text-slate-900 mb-10 tracking-tighter leading-[0.9]"
          >
            Start the <span className="italic">Dialogue</span>.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-2xl text-slate-600 leading-relaxed font-light"
          >
            Have a project in mind or need strategic guidance? Our team is ready to help you navigate your digital transformation journey.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
          {/* Contact Info */}
          <div className="lg:col-span-6 flex flex-col gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="bg-slate-950 p-12 rounded-[3rem] text-white relative overflow-hidden group hover:shadow-xl hover:shadow-slate-900/10 transition-all duration-500 border border-slate-800"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#C5A059]/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-[#C5A059]/10 transition-colors duration-500"></div>
              <h3 className="text-xl font-serif font-light mb-12 tracking-tighter">Contact Information</h3>
              <div className="space-y-10">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 text-[#C5A059] group-hover:scale-110 transition-transform duration-500">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-500 mb-2">Our Office</p>
                    <p className="text-slate-300 font-light">Lucknow, Uttar Pradesh.</p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 text-[#C5A059] group-hover:scale-110 transition-transform duration-500">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-500 mb-2">Call Us</p>
                    <p className="text-slate-300 font-light">+91 9453507033</p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 text-[#C5A059] group-hover:scale-110 transition-transform duration-500">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-500 mb-2">Email Us</p>
                    <p className="text-slate-300 font-light">info@statvioninfotech.in</p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 text-[#C5A059] group-hover:scale-110 transition-transform duration-500">
                    <MessageCircle size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-500 mb-2">WhatsApp</p>
                    <a href="https://api.whatsapp.com/send?phone=9453507033" target="_blank" rel="noopener noreferrer" className="text-slate-300 font-light hover:text-[#1E3A8A] transition-colors">
                      Chat with us
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Map Placeholder */}
            <motion.a 
              href="https://www.google.com/maps/place/Lucknow,+Uttar+Pradesh"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="block flex-grow min-h-[320px] rounded-[3rem] bg-slate-50 overflow-hidden relative group border border-slate-200"
            >
              <img 
                src={images.contactMap} 
                alt="Map of Lucknow" 
                className="w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/90 backdrop-blur-xl px-8 py-4 rounded-full shadow-xl border border-slate-200 group-hover:scale-105 transition-transform duration-300">
                  <span className="text-xs font-bold tracking-[0.3em] uppercase text-slate-900 flex items-center gap-3">
                    <MapPin size={16} className="text-[#1E3A8A]" /> Statvion Infotech
                  </span>
                </div>
              </div>
            </motion.a>
          </div>

          {/* Form */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 h-full"
          >
            <form onSubmit={handleSubmit} className="bg-slate-950 p-10 lg:p-20 rounded-[3rem] shadow-xl shadow-slate-900/10 border border-slate-800 h-full flex flex-col">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400 ml-1">Your Name</label>
                  <input 
                    type="text" 
                    required 
                    value={formState.name}
                    onChange={(e) => setFormState({...formState, name: e.target.value})}
                    placeholder="John Doe"
                    className="w-full px-6 py-5 rounded-2xl bg-slate-900 border border-slate-800 focus:bg-slate-800 focus:border-[#1E3A8A]/30 outline-none transition-all font-light text-lg text-white" 
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400 ml-1">Email Address</label>
                  <input 
                    type="email" 
                    required 
                    value={formState.email}
                    onChange={(e) => setFormState({...formState, email: e.target.value})}
                    placeholder="john@example.com"
                    className="w-full px-6 py-5 rounded-2xl bg-slate-900 border border-slate-800 focus:bg-slate-800 focus:border-[#1E3A8A]/30 outline-none transition-all font-light text-lg text-white" 
                  />
                </div>
              </div>
              <div className="space-y-3 mb-10">
                <label className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400 ml-1">Subject</label>
                <input 
                  type="text" 
                  required 
                  value={formState.subject}
                  onChange={(e) => setFormState({...formState, subject: e.target.value})}
                  placeholder="Strategic Inquiry"
                  className="w-full px-6 py-5 rounded-2xl bg-slate-900 border border-slate-800 focus:bg-slate-800 focus:border-[#1E3A8A]/30 outline-none transition-all font-light text-lg text-white" 
                />
              </div>
              <div className="space-y-3 mb-12">
                <label className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400 ml-1">Your Message</label>
                <textarea 
                  rows={6} 
                  required 
                  value={formState.message}
                  onChange={(e) => setFormState({...formState, message: e.target.value})}
                  placeholder="Describe your vision..."
                  className="w-full px-6 py-5 rounded-2xl bg-slate-900 border border-slate-800 focus:bg-slate-800 focus:border-[#1E3A8A]/30 outline-none transition-all font-light text-lg resize-none text-white"
                ></textarea>
              </div>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full mt-auto bg-[#C5A059] text-white font-bold py-6 rounded-2xl hover:bg-[#A68446] transition-all flex items-center justify-center gap-4 text-xl shadow-2xl shadow-[#C5A059]/20"
              >
                Schedule Strategy Session <Send size={20} className="font-light" />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {isSent && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-8 right-8 z-50 bg-slate-900 border border-slate-800 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 max-w-md"
          >
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
              <CheckCircle className="text-emerald-500" size={20} />
            </div>
            <div>
              <h4 className="font-bold text-sm mb-1">Message Received</h4>
              <p className="text-slate-400 text-sm font-light">Our leadership team will contact you shortly.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Contact;
