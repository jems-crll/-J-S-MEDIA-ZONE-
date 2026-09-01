import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Facebook, Instagram, Twitter, Youtube, Linkedin, Mail, Phone, MapPin, ArrowUp, ShieldCheck } from 'lucide-react';
import { useState, useEffect } from 'react';
import { navItems, services, whatWeOffer, whyChooseUs } from './data';
import Typewriter from './components/Typewriter';
import ServiceCard from './components/ServiceCard';
import TeamCard from './components/TeamCard';
import EmailMarketingView from './components/EmailMarketing';
import ITServicesView from './components/ITServices';
import AdminDashboard from './components/AdminDashboard';
import { ViewState } from './types';
import { AuthProvider } from './contexts/AuthContext';
import { SiteDataProvider, useSiteData } from './contexts/SiteDataContext';

function AppContent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [view, setView] = useState<ViewState | 'admin'>('home');

  const { settings, team, loading } = useSiteData();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const navigateTo = (newView: ViewState | 'admin') => {
    setView(newView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  if (view === 'admin') {
    return <AdminDashboard />;
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-pink-100 selection:text-pink-600">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-3' : 'bg-white/90 backdrop-blur-sm py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
          <button 
            onClick={() => navigateTo('home')}
            className="flex flex-col text-left group"
          >
            <span className="text-2xl font-black tracking-tighter text-gray-900 group-hover:text-pink-600 transition-colors">
              j s <span className="text-pink-600 group-hover:text-gray-900">Media</span>
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500 -mt-1">
              Unlock Your Business
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => navigateTo('home')}
              className={`text-sm font-semibold transition-colors ${view === 'home' ? 'text-pink-600' : 'text-gray-700 hover:text-pink-600'}`}
            >
              Home
            </button>
            <a href="#about" onClick={(e) => { e.preventDefault(); navigateTo('home'); setTimeout(() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="text-sm font-semibold text-gray-700 hover:text-pink-600 transition-colors">About Us</a>
            <div className="relative group">
              <button className={`text-sm font-semibold transition-colors ${view !== 'home' ? 'text-pink-600' : 'text-gray-700 hover:text-pink-600'}`}>
                Services
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-xl rounded-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all py-2">
                <button onClick={() => navigateTo('email-marketing')} className="w-full text-left px-4 py-2 text-sm hover:bg-pink-50 hover:text-pink-600">Email Marketing</button>
                <button onClick={() => navigateTo('it-services')} className="w-full text-left px-4 py-2 text-sm hover:bg-pink-50 hover:text-pink-600">IT Services</button>
              </div>
            </div>
            <button className="text-sm font-semibold text-gray-700 hover:text-pink-600 transition-colors">Careers</button>
            <button onClick={() => navigateTo('contact')} className="text-sm font-semibold text-gray-700 hover:text-pink-600 transition-colors">Contact</button>
          </nav>

          <button 
            className="md:hidden text-gray-900"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden bg-white border-t border-gray-100 absolute w-full left-0 p-4 shadow-xl"
            >
              <div className="flex flex-col space-y-4">
                <button onClick={() => navigateTo('home')} className="text-lg font-semibold text-left">Home</button>
                <button onClick={() => navigateTo('email-marketing')} className="text-lg font-semibold text-left">Email Marketing</button>
                <button onClick={() => navigateTo('it-services')} className="text-lg font-semibold text-left">IT Services</button>
                <button onClick={() => navigateTo('contact')} className="text-lg font-semibold text-left">Contact</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <AnimatePresence mode="wait">
        {view === 'home' && (
          <motion.main
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Hero Section */}
            <section className="relative pt-40 pb-32 overflow-hidden bg-gradient-to-b from-gray-50 to-white">
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#ec4899_1px,transparent_1px)] bg-[length:40px_40px]"></div>
              </div>
              
              <div className="max-w-7xl mx-auto px-4 md:px-6 text-center relative z-10">
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-5xl md:text-7xl font-black text-gray-900 mb-8 leading-tight"
                >
                  Welcome To j s Media
                </motion.h1>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-xl md:text-2xl text-gray-600 mb-12 flex flex-col md:flex-row items-center justify-center gap-2"
                >
                  <span className="font-medium">We Provide</span>
                  <Typewriter />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <button
                    onClick={() => navigateTo('it-services')}
                    className="inline-block bg-white text-gray-700 border-2 border-gray-200 px-8 py-3 rounded-full font-bold text-lg hover:border-pink-600 hover:text-pink-600 transition-all duration-300 cursor-pointer"
                  >
                    Explore Our Services
                  </button>
                </motion.div>
              </div>
            </section>

            {/* Services Grid */}
            <section id="services" className="py-24 bg-white">
              <div className="max-w-7xl mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {services.map((service, index) => (
                    <ServiceCard 
                      key={service.id} 
                      service={service} 
                      index={index} 
                      onClick={() => navigateTo(service.id === 'email-marketing' ? 'email-marketing' : 'it-services')}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-24 bg-gray-50">
              <div className="max-w-7xl mx-auto px-4 md:px-6">
                <div className="relative rounded-3xl overflow-hidden bg-white shadow-xl mb-16 group">
                  <div className="absolute inset-0 bg-pink-600/10 mix-blend-multiply opacity-50 group-hover:opacity-30 transition-opacity"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=2000" 
                    alt="Office background" 
                    className="w-full h-[400px] object-cover"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                    <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-4">About {settings?.companyName || 'j s Media'}</h2>
                    <p className="text-xl text-gray-700 max-w-2xl font-medium">
                      Crafting digital experiences with innovation and impact.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="bg-white p-10 rounded-3xl shadow-lg border border-gray-100"
                  >
                    <h3 className="text-2xl font-black text-pink-600 mb-6">Who We Are</h3>
                    <p className="text-gray-600 leading-relaxed text-lg">
                      {settings?.companyName || 'j s Media'} is a forward-thinking digital media and IT service company that helps businesses thrive in the digital world. We specialize in email marketing, IT support, branding, and integrated digital campaigns that bring real results.
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 flex items-center justify-center"
                  >
                    <div className="text-center">
                      <div className="w-24 h-24 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4 text-pink-600">
                        <span className="text-4xl font-black">{settings?.ceoInitials || 'JS'}</span>
                      </div>
                      <h4 className="text-xl font-bold text-gray-900">{settings?.ceoName || 'Javed Sayyad'}</h4>
                      <p className="text-sm text-pink-600 font-semibold uppercase tracking-wider">{settings?.ceoRole || 'CEO - j s Media'}</p>
                    </div>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white p-10 rounded-3xl shadow-lg border-l-8 border-pink-600 mb-16"
                >
                  <h3 className="text-2xl font-black text-pink-600 mb-4">Our Mission</h3>
                  <p className="text-gray-700 text-lg">
                    To deliver innovative and result-driven marketing and technology solutions that help our clients achieve digital excellence.
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-white p-10 rounded-3xl shadow-lg border border-gray-100"
                  >
                    <h3 className="text-2xl font-black text-pink-600 mb-8">What We Offer</h3>
                    <ul className="space-y-4">
                      {whatWeOffer.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-700">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-pink-600 flex-shrink-0" />
                          <span className="font-medium">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-white p-10 rounded-3xl shadow-lg border border-gray-100"
                  >
                    <h3 className="text-2xl font-black text-pink-600 mb-8">Why Choose Us?</h3>
                    <div className="space-y-6">
                      {whyChooseUs.map((item, i) => (
                        <div key={i} className="flex flex-col">
                          <span className="text-gray-900 font-black text-lg">
                            • {item.title}: <span className="font-normal text-gray-600 text-base">{item.text}</span>
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* Team Section */}
            <section className="py-24 bg-white">
              <div className="max-w-7xl mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-5xl font-black text-blue-900 relative inline-block">
                    Meet Our <span className="relative">Team
                      <span className="absolute -bottom-2 left-0 w-full h-1 bg-pink-500 rounded-full"></span>
                    </span>
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                  {team.length > 0 ? (
                    team.map((member, index) => (
                      <TeamCard key={member.id} member={member} index={index} />
                    ))
                  ) : (
                    <div className="col-span-full text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                      <p className="text-gray-400 font-medium">No team members added yet.</p>
                    </div>
                  )}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-pink-50/50 p-12 rounded-[2rem] border border-pink-200 text-center max-w-4xl mx-auto relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-2 h-full bg-pink-600"></div>
                  <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-4">
                    Ready to take your business to the next level?
                  </h3>
                  <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                    Partner with {settings?.companyName || 'j s Media'} and experience the power of strategic digital solutions.
                  </p>
                  <button 
                    onClick={() => navigateTo('contact')}
                    className="bg-pink-600 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-pink-700 transition-colors shadow-lg shadow-pink-200 cursor-pointer"
                  >
                    Get in Touch
                  </button>
                </motion.div>
              </div>
            </section>
          </motion.main>
        )}

        {view === 'email-marketing' && <EmailMarketingView key="email" />}
        {view === 'it-services' && <ITServicesView key="it" onContactClick={() => navigateTo('contact')} />}
        
        {view === 'contact' && (
          <motion.main
            key="contact"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pt-32 pb-20 bg-gray-50 px-4"
          >
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">Contact j s Media</h1>
                <p className="text-gray-600">Reach out to us for digital marketing, IT solutions, or business collaboration.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex items-center gap-4">
                    <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center text-pink-600">
                      <Mail size={24} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase">Email</p>
                      <p className="font-bold">{settings?.contactEmail || 'info@jsmedia.com'}</p>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex items-center gap-4">
                    <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center text-pink-600">
                      <Phone size={24} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase">Phone</p>
                      <p className="font-bold">{settings?.contactPhone || '+91-9921636637'}</p>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex items-center gap-4">
                    <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center text-pink-600">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase">Address</p>
                      <p className="font-bold">{settings?.officeAddress || 'Pune, Maharashtra, India'}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-3xl shadow-2xl border border-gray-100">
                  <div className="space-y-4">
                    <input id="enquiry-name" type="text" placeholder="Your Name" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-pink-600" />
                    <input id="enquiry-email" type="email" placeholder="Your Email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-pink-600" />
                    <textarea id="enquiry-message" placeholder="Your Message" rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-pink-600 resize-none"></textarea>
                    <button 
                      onClick={async () => {
                        const name = (document.getElementById('enquiry-name') as HTMLInputElement).value;
                        const email = (document.getElementById('enquiry-email') as HTMLInputElement).value;
                        const message = (document.getElementById('enquiry-message') as HTMLTextAreaElement).value;
                        
                        if (!name || !email || !message) {
                          alert('Please fill all fields');
                          return;
                        }

                        try {
                          const { addDoc, collection } = await import('firebase/firestore');
                          const { db } = await import('./lib/firebase');
                          await addDoc(collection(db, 'enquiries'), {
                            name,
                            email,
                            message,
                            createdAt: new Date(),
                            status: 'new'
                          });
                          alert('Thank you! Your enquiry has been sent.');
                          (document.getElementById('enquiry-name') as HTMLInputElement).value = '';
                          (document.getElementById('enquiry-email') as HTMLInputElement).value = '';
                          (document.getElementById('enquiry-message') as HTMLTextAreaElement).value = '';
                        } catch (error) {
                          alert('Error sending enquiry: ' + error);
                        }
                      }}
                      className="w-full bg-pink-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-pink-700 transition-colors shadow-lg shadow-pink-200"
                    >
                      Send Message
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.main>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer id="contact" className="bg-[#111111] text-white pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Branding */}
            <div>
              <div className="flex flex-col mb-6">
                <span className="text-2xl font-black tracking-tighter">
                  j s <span className="text-pink-600">Media</span>
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500 -mt-1">
                  Unlock Your Business
                </span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Empowering your brand with digital marketing, IT solutions, and creative media services.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-pink-600 transition-colors">
                  <Linkedin size={16} />
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-pink-600 transition-colors">
                  <Facebook size={16} />
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-pink-600 transition-colors">
                  <Instagram size={16} />
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-pink-600 transition-colors">
                  <Twitter size={16} />
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-pink-600 transition-colors">
                  <Youtube size={16} />
                </a>
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="text-lg font-bold mb-6">Navigation</h4>
              <ul className="space-y-3 text-left">
                <li><button onClick={() => navigateTo('home')} className="text-gray-400 hover:text-white text-sm transition-colors">Home</button></li>
                <li><button onClick={() => { navigateTo('home'); setTimeout(() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="text-gray-400 hover:text-white text-sm transition-colors">About Us</button></li>
                <li><button onClick={() => navigateTo('it-services')} className="text-gray-400 hover:text-white text-sm transition-colors">Services</button></li>
                <li><button className="text-gray-400 hover:text-white text-sm transition-colors">Careers</button></li>
                <li><button onClick={() => navigateTo('contact')} className="text-gray-400 hover:text-white text-sm transition-colors">Contact</button></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-lg font-bold mb-6">Legal</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms & Conditions</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Delete My Data</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-lg font-bold mb-6">Contact</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-sm text-gray-400">
                  <MapPin size={18} className="text-pink-600 shrink-0" />
                  <span>{settings?.officeAddress || 'Pune, Maharashtra, India'}</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-400">
                  <Phone size={18} className="text-pink-600 shrink-0" />
                  <span>{settings?.contactPhone || '+91-9921636637'}</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-400">
                  <Mail size={18} className="text-pink-600 shrink-0" />
                  <span>{settings?.contactEmail || 'info@jsmedia.com'}</span>
                </li>
              </ul>
              
              <div className="mt-8">
                <p className="text-sm font-bold mb-3">Admin Portal:</p>
                <button 
                  onClick={() => navigateTo('admin')}
                  className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-pink-600 transition-colors uppercase tracking-widest"
                >
                  <ShieldCheck size={14} />
                  Office Login
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[12px] text-gray-500">
            <p>© 2026 {settings?.companyName || 'j s Media'}. All rights reserved. | Privacy Policy | Terms | Delete Data</p>
            <button 
              onClick={scrollToTop}
              className="w-10 h-10 rounded-full bg-pink-600 text-white flex items-center justify-center hover:bg-pink-700 transition-colors shadow-lg"
            >
              <ArrowUp size={20} />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <SiteDataProvider>
        <AppContent />
      </SiteDataProvider>
    </AuthProvider>
  );
}
