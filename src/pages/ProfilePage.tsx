import { useAuth } from '@/contexts/AuthContext';
import { useI18n } from '@/contexts/I18nContext';

import { useBrewLogs } from '@/hooks/useBrewLogs';
import { useTeaLeaves } from '@/hooks/useTeaLeaves';
import { useTeawares } from '@/hooks/useTeaware';
import { motion } from 'framer-motion';
import { pageTransition, pageTransitionProps, staggerContainer, staggerItem } from '@/lib/animations';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const { t, locale, setLocale } = useI18n();

  const { data: brewLogs } = useBrewLogs();
  const { data: teas } = useTeaLeaves();
  const { data: teawares } = useTeawares();

  return (
    <motion.div
      className="px-6 pt-12 pb-8"
      variants={pageTransition}
      initial="initial"
      animate="animate"
      transition={pageTransitionProps}
    >
      {/* Profile Header */}
      <motion.div
        className="flex items-center gap-4 mb-8"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.div
          variants={staggerItem}
          className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center"
        >
          <span className="material-icons text-primary text-3xl">person</span>
        </motion.div>
        <motion.div variants={staggerItem}>
          <h1 className="text-2xl font-bold text-neutral-dark dark:text-white">
            {user?.username}
          </h1>
          <p className="text-sm text-text-muted">{user?.email}</p>
        </motion.div>
      </motion.div>

      {/* Stats */}
      <motion.div
        className="grid grid-cols-3 gap-4 mb-8"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.div variants={staggerItem} className="text-center p-4 bg-white dark:bg-neutral-dark/40 rounded-xl border border-neutral-light dark:border-neutral-dark/50">
          <span className="text-2xl font-bold text-neutral-dark dark:text-white block">
            {brewLogs?.length || 0}
          </span>
          <span className="text-xs text-text-muted font-medium">{t('profile.brews')}</span>
        </motion.div>
        <motion.div variants={staggerItem} className="text-center p-4 bg-white dark:bg-neutral-dark/40 rounded-xl border border-neutral-light dark:border-neutral-dark/50">
          <span className="text-2xl font-bold text-neutral-dark dark:text-white block">
            {teas?.length || 0}
          </span>
          <span className="text-xs text-text-muted font-medium">{t('profile.teas')}</span>
        </motion.div>
        <motion.div variants={staggerItem} className="text-center p-4 bg-white dark:bg-neutral-dark/40 rounded-xl border border-neutral-light dark:border-neutral-dark/50">
          <span className="text-2xl font-bold text-neutral-dark dark:text-white block">
            {teawares?.length || 0}
          </span>
          <span className="text-xs text-text-muted font-medium">{t('profile.teaware')}</span>
        </motion.div>
      </motion.div>

      {/* Settings */}
      <motion.div
        className="space-y-3"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {/* Language */}
        <motion.div variants={staggerItem} className="bg-white dark:bg-neutral-dark/40 rounded-xl border border-neutral-light dark:border-neutral-dark/50 p-4 flex items-center justify-between">
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
        </motion.div>

        {/* Sign Out */}
        <motion.button
          variants={staggerItem}
          onClick={logout}
          className="w-full bg-white dark:bg-neutral-dark/40 rounded-xl border border-neutral-light dark:border-neutral-dark/50 p-4 flex items-center gap-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
        >
          <span className="material-icons-outlined">logout</span>
          <span className="text-sm font-medium">{t('profile.signOut')}</span>
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
