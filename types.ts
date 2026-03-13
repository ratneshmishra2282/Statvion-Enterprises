
export interface NavItem {
  label: string;
  path: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'it' | 'consultancy' | 'development';
}

export interface PageContent {
  heroTitle: string;
  heroSubtitle: string;
  aboutText: string;
  vision: string;
  mission: string;
}

export interface CloudConfig {
  fileId?: string;
  lastSync?: string;
  isEnabled: boolean;
}

export interface ContactResponse {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}

export interface AnalyticsRecord {
  id?: string;
  sessionId: string;
  ip: string;
  os: string;
  browser: string;
  device: string;
  path: string;
  timeSpent: number;
  timestamp: string;
}

export interface AppImages {
  homeStrategy: string;
  aboutHero: string;
  contactMap: string;
  logoUrl?: string;
  faviconUrl?: string;
}

export interface AppTheme {
  fontFamily: string;
  fontSize: string;
}

export interface AppSEO {
  metaTitle: string;
  metaDescription: string;
}

export interface AppState {
  services: Service[];
  content: PageContent;
  isLoggedIn: boolean;
  cloudConfig: CloudConfig;
  responses: ContactResponse[];
  images: AppImages;
  theme: AppTheme;
  seo: AppSEO;
}

export enum RoutePath {
  HOME = '/',
  ABOUT = '/about',
  SERVICES = '/services',
  SECTORS = '/sectors',
  CONTACT = '/contact',
  ADMIN_LOGIN = '/admin/login',
  ADMIN_DASHBOARD = '/admin/dashboard'
}
