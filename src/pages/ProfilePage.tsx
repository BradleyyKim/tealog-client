import { useAuth } from '@/contexts/AuthContext';
import { useI18n } from '@/contexts/I18nContext';
import { useDarkMode } from '@/hooks/useDarkMode';
import { useBrewLogs } from '@/hooks/useBrewLogs';
import { useTeaLeaves } from '@/hooks/useTeaLeaves';
import { useTeawares } from '@/hooks/useTeaware';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const { t, locale, setLocale } = useI18n();
  const { isDark, toggle } = useDarkMode();
  const { data: brewLogs } = useBrewLogs();
  const { data: teas } = useTeaLeaves();
  const { data: teawares } = useTeawares();

  return (
    <div className="px-6 pt-12 pb-8">
      {/* Profile Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
          <span className="material-icons text-primary text-3xl">person</span>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-neutral-dark dark:text-white">
            {user?.username}
          </h1>
          <p className="text-sm text-text-muted">{user?.email}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="text-center p-4 bg-white dark:bg-neutral-dark/40 rounded-xl border border-neutral-light dark:border-neutral-dark/50">
          <span className="text-2xl font-bold text-neutral-dark dark:text-white block">
            {brewLogs?.length || 0}
          </span>
          <span className="text-xs text-text-muted font-medium">{t('profile.brews')}</span>
        </div>
        <div className="text-center p-4 bg-white dark:bg-neutral-dark/40 rounded-xl border border-neutral-light dark:border-neutral-dark/50">
          <span className="text-2xl font-bold text-neutral-dark dark:text-white block">
            {teas?.length || 0}
          </span>
          <span className="text-xs text-text-muted font-medium">{t('profile.teas')}</span>
        </div>
        <div className="text-center p-4 bg-white dark:bg-neutral-dark/40 rounded-xl border border-neutral-light dark:border-neutral-dark/50">
          <span className="text-2xl font-bold text-neutral-dark dark:text-white block">
            {teawares?.length || 0}
          </span>
          <span className="text-xs text-text-muted font-medium">{t('profile.teaware')}</span>
        </div>
      </div>

      {/* Settings */}
      <div className="space-y-3">
        {/* Dark Mode */}
        <div className="bg-white dark:bg-neutral-dark/40 rounded-xl border border-neutral-light dark:border-neutral-dark/50 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="material-icons-outlined text-text-muted">dark_mode</span>
            <span className="text-sm font-medium text-neutral-dark dark:text-white">{t('profile.darkMode')}</span>
          </div>
          <button
            onClick={toggle}
            className={`relative w-12 h-7 rounded-full transition-colors ${
              isDark ? 'bg-primary' : 'bg-neutral-light'
            }`}
          >
            <div
              className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                isDark ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* Language */}
        <div className="bg-white dark:bg-neutral-dark/40 rounded-xl border border-neutral-light dark:border-neutral-dark/50 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="material-icons-outlined text-text-muted">translate</span>
            <span className="text-sm font-medium text-neutral-dark dark:text-white">{t('profile.language')}</span>
          </div>
          <div className="flex bg-neutral-light dark:bg-neutral-dark/50 rounded-lg p-0.5">
            <button
              onClick={() => setLocale('en')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                locale === 'en'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-text-muted hover:text-neutral-dark dark:hover:text-white'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLocale('ko')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                locale === 'ko'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-text-muted hover:text-neutral-dark dark:hover:text-white'
              }`}
            >
              KO
            </button>
          </div>
        </div>

        {/* Sign Out */}
        <button
          onClick={logout}
          className="w-full bg-white dark:bg-neutral-dark/40 rounded-xl border border-neutral-light dark:border-neutral-dark/50 p-4 flex items-center gap-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
        >
          <span className="material-icons-outlined">logout</span>
          <span className="text-sm font-medium">{t('profile.signOut')}</span>
        </button>
      </div>
    </div>
  );
}
