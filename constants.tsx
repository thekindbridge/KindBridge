import React from 'react';
import { Globe, Cpu, Users, Shield, Zap, Heart, ShieldCheck, Sparkles, Handshake } from 'lucide-react';
import { RequestStatus, Service, ValuePoint } from './types';

export const BRAND_NAME = 'Kind-Bridge';
export const CONTACT_EMAIL = 'thekindbridge@gmail.com';
export const ADMIN_EMAIL = 'thekindbridge@gmail.com';
export const REQUEST_STATUSES: RequestStatus[] = ['Submitted', 'In process', 'Completed', 'Rejected', "We'll contact", 'Cancelled'];

export const SERVICES: Service[] = [
  {
    id: 's1',
    title: 'Strategic Consulting',
    description: 'We help you navigate complex technological landscapes with tailored strategy and implementation roadmaps.',
    longDescription:
      'Our strategic consulting practice bridges the gap between vision and execution. We perform deep-dive infrastructure audits, competitor analysis, and future-proofing assessments to ensure your roadmap is both ambitious and achievable. We focus on sustainable growth and long-term digital sovereignty.',
    iconName: 'Globe',
  },
  {
    id: 's2',
    title: 'Custom Software',
    description: 'Building bridges between your vision and reality through robust, scalable, and modern digital architectures.',
    longDescription:
      'From cloud-native applications to sophisticated internal tools, our engineering team crafts software that lasts. We leverage modern stacks (React, Node, Cloud-native architectures) to build responsive, performant, and delightful interfaces that solve real-world problems for your users.',
    iconName: 'Cpu',
  },
  {
    id: 's3',
    title: 'Community Integration',
    description: 'Fostering environments where people and technology coexist seamlessly to drive shared prosperity.',
    longDescription:
      'Kind-Bridge believes technology should foster community, not isolation. We design digital ecosystems that facilitate human connection, from collaborative platforms to community-driven data initiatives. We help organizations build trust and engagement with their stakeholders.',
    iconName: 'Users',
  },
  {
    id: 's4',
    title: 'Secure Resilience',
    description: 'Fortifying your infrastructure with top-tier security measures, ensuring trust and business continuity.',
    longDescription:
      'Security is the foundation of any bridge. We provide end-to-end security consulting, implementation of zero-trust architectures, and disaster recovery planning. Our mission is to ensure your business remains resilient against modern threats while maintaining high accessibility.',
    iconName: 'Shield',
  },
  {
    id: 's5',
    title: 'Agile Performance',
    description: 'Optimizing existing workflows to increase speed, efficiency, and clarity across your organization.',
    longDescription:
      'Efficiency is about removing the friction between an idea and its realization. We help organizations adopt agile methodologies and DevOps best practices, automating repetitive tasks and streamlining communication channels to maximize human potential.',
    iconName: 'Zap',
  },
  {
    id: 's6',
    title: 'Impact Driven',
    description: 'Focusing on solutions that make a tangible difference in the lives of users and community stakeholders.',
    longDescription:
      'Every project we take on is evaluated for its social and human impact. We specialize in building solutions for mission-driven organizations, ensuring that technology serves as a lever for positive change in the world.',
    iconName: 'Heart',
  },
];

export const VALUE_POINTS: ValuePoint[] = [
  {
    title: 'Unwavering Trust',
    description: 'Our core philosophy is built on transparency. We act as your primary partner in every digital endeavor.',
    iconName: 'ShieldCheck',
  },
  {
    title: 'Innovative Clarity',
    description: "Technology shouldn't be a mystery. We simplify the complex to empower your decision-making.",
    iconName: 'Sparkles',
  },
  {
    title: 'Supportive Partnership',
    description: "We don't just deliver projects; we build lasting relationships that grow alongside your brand.",
    iconName: 'Handshake',
  },
];

export const getIcon = (name: string, size = 24, className = '') => {
  const icons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
    Globe,
    Cpu,
    Users,
    Shield,
    Zap,
    Heart,
    ShieldCheck,
    Sparkles,
    Handshake,
  };

  const IconComponent = icons[name] || Globe;
  return <IconComponent size={size} className={className} />;
};
