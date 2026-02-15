import { useState, useCallback } from 'react';
import { TEA_CATEGORIES, TEAWARE_TYPES } from '@/lib/constants';

const TEA_CATEGORIES_KEY = 'chacha_tea_categories';
const TEAWARE_TYPES_KEY = 'chacha_teaware_types';

export const DEFAULT_TEA_CATEGORIES = [...TEA_CATEGORIES] as string[];
export const DEFAULT_TEAWARE_TYPES = [...TEAWARE_TYPES] as string[];

function loadFromStorage(key: string, defaults: string[]): string[] {
  try {
    const stored = localStorage.getItem(key);
    if (stored) return JSON.parse(stored);
  } catch {
    // ignore
  }
  return [...defaults];
}

function saveToStorage(key: string, items: string[]) {
  localStorage.setItem(key, JSON.stringify(items));
}

export function useTeaCategories() {
  const [categories, setCategories] = useState<string[]>(() =>
    loadFromStorage(TEA_CATEGORIES_KEY, DEFAULT_TEA_CATEGORIES),
  );

  const add = useCallback((name: string) => {
    setCategories((prev) => {
      if (prev.includes(name)) return prev;
      const next = [...prev, name];
      saveToStorage(TEA_CATEGORIES_KEY, next);
      return next;
    });
  }, []);

  const remove = useCallback((name: string) => {
    setCategories((prev) => {
      const next = prev.filter((c) => c !== name);
      saveToStorage(TEA_CATEGORIES_KEY, next);
      return next;
    });
  }, []);

  return { categories, add, remove };
}

export function useTeawareTypes() {
  const [types, setTypes] = useState<string[]>(() =>
    loadFromStorage(TEAWARE_TYPES_KEY, DEFAULT_TEAWARE_TYPES),
  );

  const add = useCallback((name: string) => {
    setTypes((prev) => {
      if (prev.includes(name)) return prev;
      const next = [...prev, name];
      saveToStorage(TEAWARE_TYPES_KEY, next);
      return next;
    });
  }, []);

  const remove = useCallback((name: string) => {
    setTypes((prev) => {
      const next = prev.filter((t) => t !== name);
      saveToStorage(TEAWARE_TYPES_KEY, next);
      return next;
    });
  }, []);

  return { types, add, remove };
}
