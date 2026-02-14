import { useAuth } from '@/contexts/AuthContext';
import { useI18n } from '@/contexts/I18nContext';
import { useBrewLogs } from '@/hooks/useBrewLogs';
import { useTeaLeaves } from '@/hooks/useTeaLeaves';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import StatCard from '@/components/domain/StatCard';
import BrewLogHeroCard from '@/components/domain/BrewLogHeroCard';
import BrewLogListItem from '@/components/domain/BrewLogListItem';
import EmptyState from '@/components/ui/EmptyState';
import { useNavigate } from 'react-router-dom';
import { isThisWeek, differenceInCalendarDays, parseISO } from 'date-fns';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations';

function useGreeting() {
  const { t } = useI18n();
  const hour = new Date().getHours();
  if (hour < 12) return { text: t('home.goodMorning'), icon: 'wb_sunny' };
  if (hour < 18) return { text: t('home.goodAfternoon'), icon: 'wb_sunny' };
  return { text: t('home.goodEvening'), icon: 'dark_mode' };
}

function calculateStreak(logs: { brewed_at: string }[]): number {
  if (!logs.length) return 0;
  const dates = [...new Set(logs.map((l) => l.brewed_at.slice(0, 10)))].sort().reverse();
  let streak = 0;
  let checkDate = new Date();

  for (const d of dates) {
    const logDate = parseISO(d);
    const diff = differenceInCalendarDays(checkDate, logDate);
    if (diff <= 1) {
      streak++;
      checkDate = logDate;
    } else {
      break;
    }
  }
  return streak;
}

export default function HomePage() {
  const { user } = useAuth();
  const { t } = useI18n();
  const navigate = useNavigate();
  const { data: brewLogs, isLoading: logsLoading } = useBrewLogs();
  const { data: teas } = useTeaLeaves();
  const greeting = useGreeting();

  if (logsLoading) return <LoadingSpinner />;

  const logs = brewLogs || [];
  const weekLogs = logs.filter((l) => isThisWeek(new Date(l.brewed_at), { weekStartsOn: 1 }));
  const recentLogs = logs.slice(0, 3);
  const streak = calculateStreak(logs);
  const teasCount = teas?.length || 0;

  return (
    <div className="relative">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      {/* Header */}
      <motion.header
        className="pt-12 pb-4 px-6 flex justify-between items-center z-10 relative"
        variants={fadeInUp}
        initial="initial"
        animate="animate"
      >
        <div>
          <div className="flex items-center gap-2 text-neutral-mid dark:text-gray-400 mb-1">
            <span className="material-icons-outlined text-xl text-primary">{greeting.icon}</span>
            <span className="text-sm font-semibold tracking-wide uppercase">{t('home.teaTime')}</span>
          </div>
          <h1 className="text-3xl font-bold text-neutral-dark dark:text-white">
            {greeting.text},
            <br />
            {user?.username || t('home.teaLover')}
          </h1>
        </div>
        <button
          onClick={() => navigate('/profile')}
          className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/30 bg-primary/10 flex items-center justify-center"
        >
          <span className="material-icons text-primary text-xl">person</span>
        </button>
      </motion.header>

      <div className="z-10 relative">
        {/* Featured: Last Brewed */}
        {recentLogs.length > 0 && (
          <motion.section
            className="mt-4 pl-6"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <div className="flex justify-between items-end pr-6 mb-4">
              <h2 className="text-lg font-bold text-neutral-dark dark:text-white">{t('home.lastBrewed')}</h2>
            </div>
            <div className="flex overflow-x-auto gap-4 pb-6 pr-6 no-scrollbar snap-x snap-mandatory">
              {recentLogs.map((log) => (
                <motion.div key={log.documentId} variants={staggerItem}>
                  <BrewLogHeroCard log={log} />
                </motion.div>
              ))}
              {/* Suggestion card */}
              <motion.div
                variants={staggerItem}
                className="min-w-[85%] snap-center relative aspect-[4/5] rounded-xl overflow-hidden border border-neutral-light dark:border-neutral-dark"
              >
                <div className="absolute inset-0 bg-bg-light/80 dark:bg-bg-dark/80 backdrop-blur-sm flex flex-col justify-center items-center text-center p-6">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4 text-primary">
                    <span className="material-icons text-3xl">eco</span>
                  </div>
                  <h3 className="text-xl font-bold text-neutral-dark dark:text-white mb-2">
                    {t('home.trySomethingNew')}
                  </h3>
                  <p className="text-sm text-neutral-mid mb-6">
                    {t('home.exploreDesc')}
                  </p>
                  <button
                    onClick={() => navigate('/teas')}
                    className="bg-neutral-dark dark:bg-white text-white dark:text-bg-dark px-6 py-2 rounded-lg font-bold text-sm"
                  >
                    {t('home.exploreCollection')}
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.section>
        )}

        {logs.length === 0 && (
          <div className="px-6 mt-8">
            <EmptyState
              icon="local_cafe"
              message={t('home.noBrewLogs')}
              actionLabel={t('home.brewNow')}
              onAction={() => navigate('/brew/new')}
            />
          </div>
        )}

        {/* Stats */}
        <motion.section
          className="px-6 mt-2 mb-8"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <h2 className="text-lg font-bold text-neutral-dark dark:text-white mb-4">{t('home.yourTeaJourney')}</h2>
          <div className="grid grid-cols-2 gap-4">
            <motion.div variants={staggerItem}>
              <StatCard
                icon="local_fire_department"
                value={streak}
                label={t('home.dayStreak') as string}
                iconBgClass="bg-orange-100 dark:bg-orange-900/30"
                iconTextClass="text-orange-600 dark:text-orange-400"
              />
            </motion.div>
            <motion.div variants={staggerItem}>
              <StatCard
                icon="emoji_food_beverage"
                value={teasCount}
                label={t('home.teasOwned') as string}
              />
            </motion.div>
          </div>
        </motion.section>

        {/* This Week */}
        {weekLogs.length > 0 && (
          <motion.section
            className="px-6 pb-6"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <h2 className="text-lg font-bold text-neutral-dark dark:text-white mb-4">{t('home.thisWeek')}</h2>
            <div className="space-y-3">
              {weekLogs.slice(0, 5).map((log) => (
                <motion.div key={log.documentId} variants={staggerItem}>
                  <BrewLogListItem log={log} />
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
}
