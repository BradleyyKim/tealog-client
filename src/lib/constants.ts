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

export const TEA_CATEGORY_LABELS: Record<string, string> = {
  Green: 'Green',
  White: 'White',
  Oolong: 'Oolong',
  Black: 'Black',
  Sheng_Puerh: 'Sheng Pu-erh',
  Shou_Puerh: 'Shou Pu-erh',
  Herbal: 'Herbal',
};

export const TEAWARE_TYPES = [
  'Gaiwan',
  'Yixing_Pot',
  'Glass_Pot',
  'Pitcher',
  'Cup',
] as const;

export const TEAWARE_TYPE_LABELS: Record<string, string> = {
  Gaiwan: 'Gaiwan',
  Yixing_Pot: 'Yixing Pot',
  Glass_Pot: 'Glass Pot',
  Pitcher: 'Pitcher',
  Cup: 'Cup',
};

export const TEAWARE_STATUSES = ['Active', 'Broken', 'Sold'] as const;

export const JWT_KEY = 'tealog_jwt';
export const USER_KEY = 'tealog_user';
