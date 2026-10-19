export interface ProfileData {
  name: string;
  brandName: string;
  role: string;
  location: string;
  headline: string;
  shortIntro: string;
  email: string;
  phone: string;
  whatsapp: string; // digits only with country code, e.g. 2348000000000
  twitter: string;
  linkedin: string;
  instagram: string;
  aboutBio: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  category: 'construction' | 'property' | 'digital';
  summary: string;
  points: string[];
  icon: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'construction' | 'property' | 'digital';
  isSample: boolean;
  status: string;
  image: string;
  description: string;
  meta: string;
  linkText: string;
  externalLink?: string;
  highlights?: string[];
}

export interface PropertyListing {
  id: string;
  title: string;
  type: 'land' | 'sale' | 'rental';
  location: string;
  priceNote: string;
  titleDocument: string;
  description: string;
  isSample: boolean;
  features: string[];
}

export interface PortfolioConfig {
  profile: ProfileData;
  services: ServiceItem[];
  projects: ProjectItem[];
  properties: PropertyListing[];
}
