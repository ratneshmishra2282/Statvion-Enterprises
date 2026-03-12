
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, Globe } from 'lucide-react';
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
    <div className="pt-16 pb-32 bg-black">
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
            className="text-[#FF9933] font-bold uppercase tracking-[0.3em] text-xs mb-8"
          >
            Connect
          </motion.h2>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-4xl md:text-6xl font-serif font-light text-white mb-10 tracking-tight leading-[0.9]"
          >
            Start the <span className="italic">Dialogue</span>.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-2xl text-slate-400 leading-relaxed font-light"
          >
            Have a project in mind or need strategic guidance? Our team is ready to help you navigate your digital transformation journey.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
          {/* Contact Info */}
          <div className="lg:col-span-4 space-y-12">
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="bg-slate-950 p-12 rounded-[3rem] text-white relative overflow-hidden group hover:shadow-2xl hover:shadow-blue-900/20 transition-all duration-500 border border-slate-800"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF9933]/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-[#FF9933]/10 transition-colors duration-500"></div>
              <h3 className="text-xl font-serif font-light mb-12 tracking-tight">Contact Information</h3>
              <div className="space-y-10">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-[#FF9933] group-hover:scale-110 transition-transform duration-500">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Our Office</p>
                    <p className="text-slate-300 font-light">123 Innovation Drive, Tech City, ST 54321, USA</p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-[#FF9933] group-hover:scale-110 transition-transform duration-500">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Call Us</p>
                    <p className="text-slate-300 font-light">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-[#FF9933] group-hover:scale-110 transition-transform duration-500">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Email Us</p>
                    <p className="text-slate-300 font-light">contact@statvion.com</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Map Placeholder */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-80 rounded-[3rem] bg-slate-950 overflow-hidden relative group border border-slate-800"
            >
              <img 
                src={images.contactMap} 
                alt="Map" 
                className="w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-slate-900/90 backdrop-blur-xl px-8 py-4 rounded-full shadow-2xl border border-white/10">
                  <span className="text-xs font-bold tracking-widest uppercase text-white flex items-center gap-3">
                    <MapPin size={16} className="text-[#0EA5E9]" /> View on Google Maps
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Form */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-8"
          >
            <form onSubmit={handleSubmit} className="bg-slate-950 p-10 lg:p-20 rounded-[3rem] shadow-2xl shadow-blue-900/20 border border-slate-800">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Your Name</label>
                  <input 
                    type="text" 
                    required 
                    value={formState.name}
                    onChange={(e) => setFormState({...formState, name: e.target.value})}
                    placeholder="John Doe"
                    className="w-full px-6 py-5 rounded-2xl bg-black border border-transparent focus:bg-slate-900 focus:border-[#0EA5E9]/30 outline-none transition-all font-light text-lg text-white" 
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
                    className="w-full px-6 py-5 rounded-2xl bg-black border border-transparent focus:bg-slate-900 focus:border-[#0EA5E9]/30 outline-none transition-all font-light text-lg text-white" 
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
                  className="w-full px-6 py-5 rounded-2xl bg-black border border-transparent focus:bg-slate-900 focus:border-[#0EA5E9]/30 outline-none transition-all font-light text-lg text-white" 
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
                  className="w-full px-6 py-5 rounded-2xl bg-black border border-transparent focus:bg-slate-900 focus:border-[#0EA5E9]/30 outline-none transition-all font-light text-lg resize-none text-white"
                ></textarea>
              </div>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-[#FF9933] text-white font-bold py-6 rounded-2xl hover:bg-[#E67E22] transition-all flex items-center justify-center gap-4 text-xl shadow-2xl shadow-[#FF9933]/20"
              >
                Send Message <Send size={20} className="font-light" />
              </motion.button>
              
              {isSent && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-10 p-6 bg-emerald-900/30 text-emerald-400 border border-emerald-900/50 rounded-2xl text-center font-light text-lg"
                >
                  Thank you. Your message has been received. Our leadership team will contact you shortly.
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
