import React from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { SiteSettings } from '../types';

interface PrivacyPolicyProps {
  settings: SiteSettings | null;
}

interface SectionProps {
  number: string;
  title: string;
  children: React.ReactNode;
}

const Section = ({ number, title, children }: SectionProps) => (
  <div className="mb-12">
    <h2 className="text-2xl font-bold text-gray-900 mb-6">{number}. {title}</h2>
    <div className="text-gray-600 leading-relaxed space-y-4">
      {children}
    </div>
  </div>
);

const ListItem = ({ children }: { children: React.ReactNode }) => (
  <div className="flex gap-3 items-start">
    <Check className="w-5 h-5 text-pink-600 mt-1 shrink-0" />
    <span>{children}</span>
  </div>
);

export default function PrivacyPolicy({ settings }: PrivacyPolicyProps) {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const email = settings?.contactEmail || 'info@snjmediazone.com';
  const phone = settings?.contactPhone || '+91-9921636637';
  const address = settings?.officeAddress || 'Pune, Maharashtra, India';

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white min-h-screen"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl md:text-6xl font-bold text-white mb-4"
          >
            Privacy Policy
          </motion.h1>
          <p className="text-white/80 font-medium">Last Updated: April 23, 2026</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <Section number="1" title="Introduction">
          <p>
            At {settings?.companyName || 'SNJ Media Zone'}, we value your privacy and are committed to protecting your personal information. 
            This Privacy Policy explains how we collect, use, disclose, and safeguard your data when you visit 
            our website or use our services.
          </p>
        </Section>

        <Section number="2" title="Information We Collect">
          <p>We may collect the following types of information:</p>
          <div className="space-y-3 mt-4">
            <ListItem><strong>Personal Information:</strong> Name, email address, phone number, and company details when you contact us or subscribe to our services.</ListItem>
            <ListItem><strong>Usage Data:</strong> Information about how you interact with our website, including IP address, browser type, and pages visited.</ListItem>
            <ListItem><strong>Cookies:</strong> Small files stored on your device to enhance your browsing experience.</ListItem>
          </div>
        </Section>

        <Section number="3" title="How We Use Your Information">
          <p>We use your information to:</p>
          <div className="space-y-3 mt-4">
            <ListItem>Provide and improve our services</ListItem>
            <ListItem>Respond to your inquiries and support requests</ListItem>
            <ListItem>Send promotional emails and newsletters (with your consent)</ListItem>
            <ListItem>Analyze website usage to enhance user experience</ListItem>
            <ListItem>Comply with legal obligations</ListItem>
          </div>
        </Section>

        <Section number="4" title="Information Sharing">
          <p>We do not sell, trade, or transfer your personal information to outside parties except:</p>
          <div className="space-y-3 mt-4">
            <ListItem>With your explicit consent</ListItem>
            <ListItem>To trusted third-party service providers who assist us in operating our website</ListItem>
            <ListItem>When required by law or regulatory authorities</ListItem>
          </div>
        </Section>

        <Section number="5" title="Data Security">
          <p>
            We implement appropriate technical and organizational measures to protect your personal information 
            against unauthorized access, alteration, disclosure, or destruction.
          </p>
        </Section>

        <Section number="6" title="Your Rights">
          <p>You have the right to:</p>
          <div className="space-y-3 mt-4">
            <ListItem>Access the personal information we hold about you</ListItem>
            <ListItem>Request correction of inaccurate data</ListItem>
            <ListItem>Request deletion of your personal data</ListItem>
            <ListItem>Opt-out of marketing communications</ListItem>
            <ListItem>Request data portability</ListItem>
          </div>
          <p className="mt-6">
            To exercise these rights, please contact us at <a href={`mailto:${email}`} className="text-pink-600 font-bold hover:underline">{email}</a> or use our Data Deletion Request form.
          </p>
        </Section>

        <Section number="7" title="Cookies">
          <p>
            We use cookies to analyze website traffic and optimize your experience. You can control cookies through 
            your browser settings.
          </p>
        </Section>

        <Section number="8" title="Third-Party Links">
          <p>
            Our website may contain links to third-party websites. We are not responsible for their privacy practices.
          </p>
        </Section>

        <Section number="9" title="Children's Privacy">
          <p>
            Our services are not intended for children under 13. We do not knowingly collect personal information from children.
          </p>
        </Section>

        <Section number="10" title="Changes to This Policy">
          <p>
            We may update this Privacy Policy from time to time. We will notify you by posting the new policy on this page.
          </p>
        </Section>

        <Section number="11" title="Contact Us">
          <div className="space-y-3 mt-4">
            <ListItem><strong>Email:</strong> {email}</ListItem>
            <ListItem><strong>Phone:</strong> {phone}</ListItem>
            <ListItem><strong>Address:</strong> {address}</ListItem>
          </div>
        </Section>

        <div className="mt-20 pt-10 border-t border-gray-100 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Have Questions?</h3>
          <p className="text-gray-500 mb-8">Contact us for any privacy-related concerns.</p>
          <button 
            onClick={() => window.location.href = `mailto:${email}`}
            className="px-8 py-3 border-2 border-pink-100 text-pink-600 rounded-full font-bold hover:bg-pink-50 transition-all"
          >
            Contact Us
          </button>
        </div>
      </div>
    </motion.div>
  );
}
