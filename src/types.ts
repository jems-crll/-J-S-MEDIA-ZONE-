export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface SiteSettings {
  companyName: string;
  contactEmail: string;
  contactPhone: string;
  officeAddress: string;
  ceoName: string;
  ceoRole: string;
  ceoInitials: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
  order: number;
  isSpecial?: boolean;
}

export interface Campaign {
  id: string;
  title: string;
  headline?: string;
  description: string;
  bulletPoints?: string[];
  imageUrl: string;
  galleryImages: string[];
  affiliateLink: string;
  buttonText: string;
  createdAt: number;
  isActive: boolean;
  slug: string;
  emailHtml?: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export type ViewState = 'home' | 'email-marketing' | 'it-services' | 'contact' | 'privacy' | 'careers' | 'campaigns';
