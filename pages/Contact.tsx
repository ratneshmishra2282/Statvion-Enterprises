
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Globe } from 'lucide-react';
import { ContactResponse } from '../types';

interface ContactProps {
  onSendMessage?: (response: Omit<ContactResponse, 'id' | 'timestamp'>) => void;
}

const Contact: React.FC<ContactProps> = ({ onSendMessage }) => {
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSendMessage) {
      onSendMessage(formState);
    }
    setIsSent(true);
    setTimeout(() => setIsSent(false), 5000);
    setFormState({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6">Get in Touch</h1>
          <p className="max-w-2xl mx-auto text-xl text-slate-600">
            Have a project in mind or need strategic guidance? Our team is ready to help you navigate your digital transformation journey.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-slate-900 p-8 rounded-3xl text-white">
              <h3 className="text-2xl font-bold mb-8">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="font-bold">Our Office</p>
                    <p className="text-slate-400">123 Innovation Drive, Tech City, ST 54321, USA</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="font-bold">Call Us</p>
                    <p className="text-slate-400">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="font-bold">Email Us</p>
                    <p className="text-slate-400">contact@statvion.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center shrink-0">
                    <Globe size={24} />
                  </div>
                  <div>
                    <p className="font-bold">Our Website</p>
                    <p className="text-slate-400">www.statvion.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="h-64 rounded-3xl bg-slate-200 overflow-hidden relative group">
              <img 
                src="https://picsum.photos/seed/map/600/400" 
                alt="Map" 
                className="w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 transition-all"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/90 backdrop-blur px-6 py-3 rounded-full shadow-lg border border-slate-200">
                  <span className="font-bold text-slate-800 flex items-center gap-2">
                    <MapPin size={18} className="text-blue-600" /> View on Google Maps
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white p-8 lg:p-12 rounded-3xl shadow-xl border border-slate-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Your Name</label>
                  <input 
                    type="text" 
                    required 
                    value={formState.name}
                    onChange={(e) => setFormState({...formState, name: e.target.value})}
                    placeholder="John Doe"
                    className="w-full px-4 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    required 
                    value={formState.email}
                    onChange={(e) => setFormState({...formState, email: e.target.value})}
                    placeholder="john@example.com"
                    className="w-full px-4 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all" 
                  />
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-bold text-slate-700 mb-2">Subject</label>
                <input 
                  type="text" 
                  required 
                  value={formState.subject}
                  onChange={(e) => setFormState({...formState, subject: e.target.value})}
                  placeholder="How can we help you?"
                  className="w-full px-4 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all" 
                />
              </div>
              <div className="mb-8">
                <label className="block text-sm font-bold text-slate-700 mb-2">Your Message</label>
                <textarea 
                  rows={6} 
                  required 
                  value={formState.message}
                  onChange={(e) => setFormState({...formState, message: e.target.value})}
                  placeholder="Tell us about your project..."
                  className="w-full px-4 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all resize-none"
                ></textarea>
              </div>
              <button 
                type="submit"
                className="w-full bg-blue-600 text-white font-bold py-5 rounded-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-3 text-lg shadow-lg shadow-blue-200"
              >
                Send Message <Send size={20} />
              </button>
              
              {isSent && (
                <div className="mt-6 p-4 bg-green-50 text-green-700 border border-green-200 rounded-xl text-center font-medium">
                  Thank you! Your message has been sent successfully. We'll get back to you shortly.
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
