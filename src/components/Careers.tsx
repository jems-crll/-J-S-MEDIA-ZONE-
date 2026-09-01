import React from 'react';
import { motion } from 'motion/react';
import { Briefcase, Clock, FileText, CheckCircle2 } from 'lucide-react';

interface JobOpeningProps {
  number: string;
  title: string;
  experience: string;
  responsibilities: string;
  requirements: string;
}

const JobOpening = ({ number, title, experience, responsibilities, requirements }: JobOpeningProps) => (
  <motion.div 
    initial={{ y: 20, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    viewport={{ once: true }}
    className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-6 hover:shadow-md transition-shadow"
  >
    <h3 className="text-xl font-bold text-blue-900 mb-4">{number}. {title}</h3>
    <div className="space-y-3 text-sm text-gray-600">
      <div className="flex items-start gap-2">
        <Clock className="w-4 h-4 text-pink-600 mt-0.5 shrink-0" />
        <p><strong>Experience:</strong> {experience}</p>
      </div>
      <div className="flex items-start gap-2">
        <FileText className="w-4 h-4 text-pink-600 mt-0.5 shrink-0" />
        <p><strong>Responsibilities:</strong> {responsibilities}</p>
      </div>
      <div className="flex items-start gap-2">
        <CheckCircle2 className="w-4 h-4 text-pink-600 mt-0.5 shrink-0" />
        <p><strong>Requirements:</strong> {requirements}</p>
      </div>
    </div>
  </motion.div>
);

export default function Careers() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gray-50 min-h-screen"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Careers at SNJ Media Zone
          </motion.h1>
          <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto">
            Join a passionate team that is shaping the future of digital media and IT solutions.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Why Work With Us */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-900 inline-block border-b-4 border-pink-500 pb-2">Why Work With Us?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-pink-500 mt-2 shrink-0"></div>
                <p><span className="font-bold text-pink-600">Growth Opportunities:</span> We believe in nurturing talent and promoting from within.</p>
              </div>
              <div className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-pink-500 mt-2 shrink-0"></div>
                <p><span className="font-bold text-pink-600">Innovative Projects:</span> Work on real-world challenges with real impact.</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-pink-500 mt-2 shrink-0"></div>
                <p><span className="font-bold text-pink-600">Flexible Culture:</span> We support work-life balance and creativity.</p>
              </div>
              <div className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-pink-500 mt-2 shrink-0"></div>
                <p><span className="font-bold text-pink-600">Team Spirit:</span> A collaborative environment where your voice matters.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Current Openings */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-900 inline-block border-b-4 border-pink-500 pb-2">Current Openings</h2>
          </div>
          
          <JobOpening 
            number="1"
            title="Digital Marketing Executive"
            experience="1-3 years"
            responsibilities="Manage campaigns, SEO/SEM, and email automation."
            requirements="Digital marketing tools knowledge, communication skills."
          />
          
          <JobOpening 
            number="2"
            title="Web Developer"
            experience="2+ years"
            responsibilities="Build and maintain websites, optimize performance."
            requirements="HTML, CSS, JavaScript, React/Angular, basic backend knowledge."
          />
          
          <JobOpening 
            number="3"
            title="PHP Developer"
            experience="1+ year"
            responsibilities="Design creatives, social media graphics, banners."
            requirements="Photoshop, Illustrator, Canva, portfolio link."
          />
        </section>

        {/* Apply Now */}
        <div className="text-center">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full max-w-2xl py-5 bg-gradient-to-r from-cyan-400 to-blue-600 text-white font-bold text-2xl rounded-2xl shadow-xl hover:shadow-2xl transition-all border-b-4 border-blue-800"
          >
            Apply Now
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
