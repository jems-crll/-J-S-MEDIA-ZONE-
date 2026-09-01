export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
  isSpecial?: boolean;
}

export interface NavItem {
  label: string;
  href: string;
}

export type ViewState = 'home' | 'email-marketing' | 'it-services' | 'contact' | 'privacy' | 'careers';
