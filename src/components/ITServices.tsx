import { motion } from 'motion/react';
import { Monitor, Smartphone, Layers, Layout, ArrowRight } from 'lucide-react';

const itServices = [
  {
    title: 'Web Application',
    description: 'We build robust, scalable web applications tailored to your business needs. From custom dashboards to user portals, our solutions ensure high performance and security.',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=800',
    icon: <Monitor size={24} />
  },
  {
    title: 'Mobile App Development',
    description: 'We create high-performance Android and iOS apps with intuitive UI/UX, seamless integration, and scalable architecture.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800',
    icon: <Smartphone size={24} />
  },
  {
    title: 'Full Stack Developer',
    description: 'From front-end interfaces to back-end servers, we build full stack solutions ensuring seamless performance and secure integration.',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800',
    icon: <Layers size={24} />
  },
  {
    title: 'UX/UI Design',
    description: 'We craft intuitive and visually appealing user interfaces that enhance engagement and brand consistency across platforms.',
    image: 'https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?auto=format&fit=crop&q=80&w=800',
    icon: <Layout size={24} />
  }
];

interface ITServicesViewProps {
  key?: string;
  onContactClick: () => void;
}

export default function ITServicesView({ onContactClick }: ITServicesViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-20"
    >
      {/* Hero */}
      <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=2000" 
          className="absolute inset-0 w-full h-full object-cover opacity-80"
          alt="IT Services Background"
        />
        <div className="absolute inset-0 bg-white/20"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 drop-shadow-sm">
            IT <span className="relative">Services
              <span className="absolute -bottom-2 left-0 w-full h-1.5 bg-pink-600 rounded-full"></span>
            </span>
          </h1>
        </div>
      </div>

      {/* Solutions Header */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white p-12 rounded-3xl shadow-2xl text-center border border-pink-50 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-pink-600"></div>
            <h2 className="text-3xl font-black text-pink-600 mb-6">Innovative IT Solutions for Your Business</h2>
            <p className="text-gray-600 leading-relaxed text-lg max-w-4xl mx-auto">
              We offer end-to-end development services — from mobile apps to full-stack solutions — ensuring quality, performance, and user experience in every project we deliver.
            </p>
          </div>
        </div>
      </section>

      {/* We Provide Services Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-black text-pink-600 mb-16 relative inline-block">
            We Provide Services
            <span className="absolute -bottom-2 left-1/4 w-1/2 h-1 bg-pink-600 rounded-full"></span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {itServices.map((service, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -5 }}
                className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 flex flex-col text-left group"
              >
                <div className="relative h-64 overflow-hidden">
                   <img 
                    src={service.image} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt={service.title}
                  />
                  <div className="absolute top-4 left-4 bg-white/90 p-2 rounded-xl text-pink-600 shadow-sm backdrop-blur-sm">
                    {service.icon}
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-black text-pink-600 mb-4">{service.title}</h3>
                  <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                    {service.description}
                  </p>
                  <button className="text-pink-600 font-bold flex items-center gap-2 hover:gap-3 transition-all text-sm">
                    View Projects <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ideas to Life CTA */}
      <section className="py-24 bg-pink-50 text-center px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-pink-600 mb-6 tracking-tight">LET'S BRING YOUR IDEAS TO LIFE!</h2>
          <p className="text-gray-700 text-lg mb-10 max-w-2xl mx-auto font-medium">
            Whether you are launching a new business or optimizing your digital presence, j s Media has you covered.
          </p>
          <button 
            onClick={onContactClick}
            className="bg-pink-600 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-pink-700 transition-all shadow-xl shadow-pink-200 cursor-pointer scale-105 active:scale-95"
          >
            Request a Free Consultation
          </button>
        </div>
      </section>
    </motion.div>
  );
}
