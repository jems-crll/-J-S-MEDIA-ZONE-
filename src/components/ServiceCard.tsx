import { motion } from 'motion/react';
import { Service } from '../types';
import * as Icons from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  service: Service;
  index: number;
  onClick: () => void;
}

export default function ServiceCard({ service, index, onClick }: ServiceCardProps) {
  const IconComponent = (Icons as any)[service.icon] as LucideIcon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow flex flex-col items-center text-center group"
    >
      <div className="w-16 h-16 bg-pink-50 rounded-full flex items-center justify-center mb-6 text-pink-600 group-hover:bg-pink-600 group-hover:text-white transition-colors duration-300">
        {IconComponent && <IconComponent size={32} />}
      </div>
      <h3 className="text-pink-600 font-bold text-xl mb-3">{service.title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed mb-6">
        {service.description}
      </p>
      <button 
        onClick={(e) => {
          e.preventDefault();
          onClick();
        }}
        className="bg-pink-600 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-pink-700 transition-colors cursor-pointer"
      >
        Our Services
      </button>
    </motion.div>
  );
}
