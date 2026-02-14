import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useI18n } from '@/contexts/I18nContext';

const SPLASH_KEY = 'chacha_splash_shown';

export default function SplashScreen({ children }: { children: React.ReactNode }) {
  const { t } = useI18n();
  const [show, setShow] = useState(() => !sessionStorage.getItem(SPLASH_KEY));

  useEffect(() => {
    if (!show) return;
    const timer = setTimeout(() => {
      sessionStorage.setItem(SPLASH_KEY, '1');
      setShow(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, [show]);

  return (
    <>
      <AnimatePresence>
        {show && (
          <motion.div
            key="splash"
            className="fixed inset-0 z-[9999] bg-bg-light dark:bg-bg-dark flex flex-col items-center justify-center"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Icon */}
            <motion.span
              className="material-icons text-primary text-6xl"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1, rotate: [0, -8, 8, -4, 0] }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              spa
            </motion.span>

            {/* App name */}
            <motion.h1
              className="text-4xl font-bold text-neutral-dark dark:text-white mt-4 font-display"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              {t('app.name')}
            </motion.h1>

            {/* Tagline */}
            <motion.p
              className="text-text-muted text-sm mt-3 text-center px-8"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.5 }}
            >
              {t('app.tagline')}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* App content (renders behind splash, visible after exit) */}
      {children}
    </>
  );
}
