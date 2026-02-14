import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useI18n } from '@/contexts/I18nContext';
import type { TranslationKey } from '@/lib/i18n';
import { motion } from 'framer-motion';

const navItems = [
  { to: '/', icon: 'spa', labelKey: 'nav.home' as TranslationKey },
  { to: '/teas', icon: 'format_list_bulleted', labelKey: 'nav.teaList' as TranslationKey, outlined: true },
  { to: '/teaware', icon: 'coffee', labelKey: 'nav.teaware' as TranslationKey, outlined: true },
  { to: '/profile', icon: 'person', labelKey: 'nav.profile' as TranslationKey, outlined: true },
];

export default function BottomNav() {
  const { t } = useI18n();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-bg-dark/90 backdrop-blur-lg border-t border-neutral-light dark:border-neutral-dark/30 pb-[env(safe-area-inset-bottom)] z-30">
      <ul className="flex justify-around items-center pt-3 pb-3 px-4 max-w-lg mx-auto">
        {navItems.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                cn(
                  'flex flex-col items-center gap-1 transition-colors relative',
                  isActive
                    ? 'text-primary'
                    : 'text-neutral-mid hover:text-neutral-dark dark:hover:text-white',
                )
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className={isActive && !item.outlined ? 'material-icons' : 'material-icons-outlined'}>
                    {item.icon}
                  </span>
                  <span className={cn('text-[10px]', isActive ? 'font-bold' : 'font-medium')}>
                    {t(item.labelKey)}
                  </span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
