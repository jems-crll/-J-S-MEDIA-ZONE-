import { motion } from 'motion/react';
import { TeamMember } from '../contexts/SiteDataContext';
import { Star } from 'lucide-react';

interface TeamCardProps {
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
      <div className="relative mb-6">
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-pink-200">
          <img
            src={member.imageUrl}
            alt={member.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <h3 className="text-blue-900 font-bold text-xl mb-1">- {member.name}</h3>
      <p className="text-gray-500 italic text-sm">"{member.role}"</p>
    </motion.div>
  );
}
