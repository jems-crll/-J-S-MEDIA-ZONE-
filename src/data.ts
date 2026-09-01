import { Mail, Monitor, BarChart3, Headphones, Globe, Palette, ShieldCheck, Zap } from 'lucide-react';
import { Service, TeamMember, NavItem } from './types';

export const navItems: NavItem[] = [
  { label: 'Home', href: '#' },
  { label: 'About Us', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Careers', href: '#careers' },
  { label: 'Contact', href: '#contact' },
];

export const services: Service[] = [
  {
    id: 'email-marketing',
    title: 'Email Marketing',
    description: 'Elevate your brand presence and drive conversions with targeted campaigns.',
    icon: 'Mail',
  },
  {
    id: 'it-services',
    title: 'IT Services',
    description: 'Comprehensive solutions including system integration, cybersecurity, and strategic consulting.',
    icon: 'Monitor',
  },
  {
    id: 'performance-analytics',
    title: 'Performance Analytics',
    description: 'Track and optimize your campaigns with in-depth analytics, reports, and ROI insights.',
    icon: 'BarChart3',
  },
  {
    id: 'support-maintenance',
    title: '24/7 Support & Maintenance',
    description: 'Our dedicated team ensures seamless performance with round-the-clock technical support.',
    icon: 'Headphones',
  },
];

export const teamMembers: TeamMember[] = [
  {
    id: 'hina-mulla',
    name: 'Hina Mulla',
    role: 'Director & CEO',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400&h=400',
  },
  {
    id: 'sid-mulla',
    name: 'Sid Mulla',
    role: 'C.T.O',
    imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400&h=400',
    isSpecial: true,
  },
  {
    id: 'pranav',
    name: 'Pranav',
    role: 'Graphic UI Designer',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=400',
  },
  {
    id: 'javed-sayyad',
    name: 'Javed Sayyad',
    role: 'Software Engineer',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400&h=400',
  },
  {
    id: 'nikhil-date',
    name: 'Nikhil Date',
    role: 'Software Engineer',
    imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400&h=400',
  },
  {
    id: 'samiksha-kalode',
    name: 'Samiksha Kalode',
    role: 'Software Engineer',
    imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400&h=400',
  },
];

export const whatWeOffer = [
  'Email marketing and automation campaigns',
  'IT consulting and technical support',
  'Web design, hosting, and optimization',
  'Digital brand building and strategy',
  'Customer-focused analytics and reporting',
];

export const whyChooseUs = [
  { title: 'Client-Centered', text: 'Your goals are our priority.' },
  { title: 'Experienced Team', text: 'Skilled professionals with creative and technical expertise.' },
  { title: 'Reliable Support', text: '24/7 service and transparent communication.' },
  { title: 'Affordable Quality', text: 'High-performance solutions within budget.' },
];
