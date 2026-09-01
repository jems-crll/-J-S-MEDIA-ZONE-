import { motion } from 'motion/react';
import { TeamMember } from '../contexts/SiteDataContext';
import { Star } from 'lucide-react';

interface TeamCardProps {
  key?: string;
  member: TeamMember;
  index: number;
}

export default function TeamCard({ member, index }: TeamCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-white p-8 rounded-2xl shadow-md border border-gray-50 relative flex flex-col items-center text-center"
    >
      <div className="relative mb-8">
        <div className="w-48 h-48 rounded-full overflow-hidden border-[8px] border-pink-100 ring-4 ring-pink-50 shadow-inner group-hover:ring-pink-200 transition-all duration-500">
          <img
            src={member.imageUrl}
            alt={member.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        {member.isSpecial && (
          <div className="absolute top-2 right-2 text-pink-500 drop-shadow-md">
            <Star size={24} fill="currentColor" />
          </div>
        )}
      </div>
      <h3 className="text-blue-900 font-black text-2xl mb-4 group-hover:text-pink-600 transition-colors">- {member.name}</h3>
      <p className="text-gray-600 italic font-medium text-lg">"{member.role}"</p>
    </motion.div>
  );
}
