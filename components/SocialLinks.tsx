import React from 'react';
import { Instagram, Mail, MessageCircle, Send } from 'lucide-react';
import { CONTACT_EMAIL } from '../constants';

type SocialLinkItem = {
  name: 'Email' | 'Telegram' | 'WhatsApp' | 'Instagram';
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
};

const BASE_SOCIAL_LINKS: SocialLinkItem[] = [
  { name: 'Telegram', href: 'https://t.me/kindbridgeservices', icon: Send },
  { name: 'WhatsApp', href: 'https://chat.whatsapp.com/HyRfnUGrmvA6xBZbeaCzif', icon: MessageCircle },
  { name: 'Instagram', href: 'https://www.instagram.com/thekindbridge/', icon: Instagram },
];

interface SocialLinksProps {
  iconOnly?: boolean;
  includeEmail?: boolean;
  className?: string;
}

const SocialLinks: React.FC<SocialLinksProps> = ({ iconOnly = false, includeEmail = false, className = '' }) => {
  const links = includeEmail
    ? [{ name: 'Email', href: `mailto:${CONTACT_EMAIL}`, icon: Mail }, ...BASE_SOCIAL_LINKS]
    : BASE_SOCIAL_LINKS;

  return (
    <div className={`flex items-center ${iconOnly ? 'gap-2' : 'gap-3'} ${className}`.trim()}>
      {links.map(({ name, href, icon: Icon }) => (
        <a
          key={name}
          href={href}
          target={name === 'Email' ? undefined : '_blank'}
          rel={name === 'Email' ? undefined : 'noopener noreferrer'}
          aria-label={name}
          title={name}
          className={`inline-flex items-center justify-center rounded-lg border transition-all duration-300
            dark:border-white/10 border-slate-200
            dark:text-slate-300 text-slate-600
            hover:-translate-y-0.5 hover:scale-105
            dark:hover:bg-white/10 hover:bg-slate-100
            dark:hover:text-white hover:text-slate-900
            ${iconOnly ? 'h-9 w-9' : 'h-10 px-3 gap-2'}
          `}
        >
          <Icon size={16} />
          {!iconOnly && <span className="text-sm font-semibold">{name}</span>}
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
