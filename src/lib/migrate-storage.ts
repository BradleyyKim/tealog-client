const MIGRATION_MAP: Record<string, string> = {
  tealog_jwt: 'chacha_jwt',
  tealog_user: 'chacha_user',
  tealog_locale: 'chacha_locale',
  tealog_dark_mode: 'chacha_dark_mode',
};

export function migrateStorage() {
  for (const [oldKey, newKey] of Object.entries(MIGRATION_MAP)) {
    const value = localStorage.getItem(oldKey);
    if (value !== null && localStorage.getItem(newKey) === null) {
      localStorage.setItem(newKey, value);
      localStorage.removeItem(oldKey);
    }
  }
}
