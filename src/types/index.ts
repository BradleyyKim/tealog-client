// ── Strapi media ──
export interface StrapiMedia {
  id: number;
  documentId: string;
  url: string;
  name: string;
  width?: number;
  height?: number;
  formats?: {
    thumbnail?: { url: string };
    small?: { url: string };
    medium?: { url: string };
    large?: { url: string };
  };
}

// ── Auth ──
export interface AuthUser {
  id: number;
  username: string;
  email: string;
  displayName?: string;
}

export interface LoginResponse {
  jwt: string;
  user: AuthUser;
}

// ── TeaLeaf ──
export type TeaCategory = string;

export interface TeaLeaf {
  id: number;
  documentId: string;
  name: string;
  category?: TeaCategory;
  brand_origin?: string;
  year?: number;
  in_stock?: boolean;
  tasting_notes?: string;
  cover_photo?: StrapiMedia;
  createdAt: string;
  updatedAt: string;
}

export interface TeaLeafFormData {
  name: string;
  category?: TeaCategory;
  brand_origin?: string;
  year?: number;
  in_stock?: boolean;
  tasting_notes?: string;
}

// ── Teaware ──
export type TeawareType = string;
export type TeawareStatus = 'Active' | 'Broken' | 'Sold';

export interface Teaware {
  id: number;
  documentId: string;
  name: string;
  type?: TeawareType;
  material?: string;
  volume_ml?: number;
  status?: TeawareStatus;
  is_favorite?: boolean;
  photo?: StrapiMedia;
  createdAt: string;
  updatedAt: string;
}

export interface TeawareFormData {
  name: string;
  type?: TeawareType;
  material?: string;
  volume_ml?: number;
  status?: TeawareStatus;
  is_favorite?: boolean;
}

// ── BrewLog ──
export interface BrewLog {
  id: number;
  documentId: string;
  brewed_at: string;
  water_temp?: number;
  water_type?: string;
  leaf_amount_g?: number;
  steeping_details?: string;
  rating?: number;
  review?: string;
  tea?: TeaLeaf;
  teawares?: Teaware[];
  photos?: StrapiMedia[];
  createdAt: string;
  updatedAt: string;
}

export interface BrewLogFormData {
  brewed_at: string;
  water_temp?: number;
  water_type?: string;
  leaf_amount_g?: number;
  steeping_details?: string;
  rating?: number;
  review?: string;
  tea?: number | string;
  teawares?: (number | string)[];
}
