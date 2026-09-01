import { motion } from 'motion/react';
import { Mail, CheckCircle, ArrowRight } from 'lucide-react';

export default function EmailMarketingView() {
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
          src="https://images.unsplash.com/photo-1557200134-90327ee9fafa?auto=format&fit=crop&q=80&w=2000" 
          className="absolute inset-0 w-full h-full object-cover"
          alt="Email Marketing Background"
        />
        <div className="absolute inset-0 bg-sky-400/30"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 drop-shadow-sm">
            Email <span className="relative">Marketing
              <span className="absolute -bottom-2 left-0 w-full h-1.5 bg-pink-600 rounded-full"></span>
            </span>
          </h1>
        </div>
      </div>

      {/* Grow Your Reach Section */}
      <section className="py-20 px-4 bg-pink-50/30">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white p-12 rounded-3xl shadow-xl shadow-pink-100 text-center border border-pink-50">
            <h2 className="text-3xl font-black text-pink-600 mb-6">Grow Your Reach with Email Marketing</h2>
            <p className="text-gray-600 leading-relaxed text-lg max-w-3xl mx-auto">
              From custom templates to automated campaigns, our email marketing tools are crafted to help you connect with your audience, increase engagement, and boost conversions efficiently.
            </p>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-black text-pink-600 mb-16 relative inline-block">
            Email Marketing Tools
            <span className="absolute -bottom-2 left-1/4 w-1/2 h-1 bg-pink-600 rounded-full"></span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Design Card */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col text-left"
            >
              <img 
                src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&q=80&w=800" 
                className="w-full h-64 object-cover"
                alt="Design and Template"
              />
              <div className="p-8">
                <h3 className="text-2xl font-black text-pink-600 mb-4">Design and Template</h3>
                <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                  Access a wide range of professionally designed, responsive email templates tailored for every campaign need. Customize layouts, colors, and content effortlessly.
                </p>
                <button className="text-pink-600 font-bold flex items-center gap-2 hover:gap-3 transition-all">
                  View Our Templates <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>

            {/* Automation Card */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col text-left"
            >
              <img 
                src="https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&q=80&w=800" 
                className="w-full h-64 object-cover"
                alt="Automation"
              />
              <div className="p-8">
                <h3 className="text-2xl font-black text-pink-600 mb-4">Automation</h3>
                <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                  Streamline your email marketing with smart automation workflows. Schedule campaigns, trigger personalized messages based on user behavior, and ensure timely communication.
                </p>
                <button className="text-pink-600 font-bold flex items-center gap-2 hover:gap-3 transition-all">
                  Learn More <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
