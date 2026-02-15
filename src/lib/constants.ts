export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:1337';

export const TEA_CATEGORIES = [
  'Green',
  'White',
  'Oolong',
  'Black',
  'Sheng_Puerh',
  'Shou_Puerh',
  'Herbal',
] as const;

export const TEAWARE_TYPES = [
  'Gaiwan',
  'Yixing_Pot',
  'Glass_Pot',
  'Pitcher',
  'Cup',
] as const;

export const TEAWARE_STATUSES = ['Active', 'Broken', 'Sold'] as const;

export const JWT_KEY = 'chacha_jwt';
export const USER_KEY = 'chacha_user';
