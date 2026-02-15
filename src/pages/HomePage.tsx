import { useAuth } from '@/contexts/AuthContext';
import { useI18n } from '@/contexts/I18nContext';
import { useBrewLogs } from '@/hooks/useBrewLogs';
import { useTeaLeaves } from '@/hooks/useTeaLeaves';
import { useWeather } from '@/hooks/useWeather';
import { useDailyQuote } from '@/hooks/useDailyQuote';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import StatCard from '@/components/domain/StatCard';
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
  const { data: weather } = useWeather();
  const { quote } = useDailyQuote();
  const greeting = useGreeting();

  if (logsLoading) return <LoadingSpinner />;

  const logs = brewLogs || [];
  const weekLogs = logs.filter((l) => isThisWeek(new Date(l.brewed_at), { weekStartsOn: 1 }));
  const streak = calculateStreak(logs);
  const teasCount = teas?.length || 0;

  const headerIcon = weather?.icon || greeting.icon;
  const headerLabel = weather
    ? `${weather.description}, ${weather.temp}°C`
    : t('home.weatherFallback');
  const weatherSuggestion = weather?.suggestion || null;

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
            <span className="material-icons-outlined text-xl text-primary">{headerIcon}</span>
            <span className="text-sm font-semibold tracking-wide uppercase">{headerLabel}</span>
          </div>
          <h1 className="text-3xl font-bold text-neutral-dark dark:text-white">
            {greeting.text}, {user?.displayName || user?.username || t('home.teaLover')}
          </h1>
          {weatherSuggestion && (
            <p className="text-sm text-neutral-mid dark:text-gray-400 mt-1.5">
              {weatherSuggestion}
            </p>
          )}
        </div>
      </motion.header>

      <div className="z-10 relative">
        {/* Daily Quote */}
        {quote && (
          <motion.section
            className="px-6 mt-4"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <h2 className="text-lg font-bold text-neutral-dark dark:text-white mb-3">
              {t('home.dailyQuote')}
            </h2>
            <div className="bg-primary/5 dark:bg-primary/10 rounded-2xl p-5 relative overflow-hidden">
              <span className="material-icons text-primary/20 text-5xl absolute -top-1 -left-1 select-none">
                format_quote
              </span>
              <p className="text-sm leading-relaxed text-neutral-dark dark:text-gray-200 relative z-10 pl-4">
                {quote.text}
              </p>
              <span className="inline-block mt-3 ml-4 text-xs font-medium text-primary/70 bg-primary/10 px-2.5 py-0.5 rounded-full">
                {quote.theme_ko}
              </span>
            </div>
          </motion.section>
        )}

        {/* Brew CTA */}
        <motion.section
          className="px-6 mt-6"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div className="bg-white dark:bg-neutral-dark/20 rounded-2xl p-5 border border-neutral-light/50 dark:border-neutral-dark/30 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
              <span className="material-icons text-primary text-2xl">emoji_food_beverage</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-neutral-mid dark:text-gray-400">
                {t('home.brewCta')}
              </p>
            </div>
            <button
              onClick={() => navigate('/brew/new')}
              className="bg-primary text-white px-4 py-2 rounded-lg font-bold text-sm shrink-0 hover:bg-primary-dark transition-colors"
            >
              {t('home.startBrew')}
            </button>
          </div>
        </motion.section>

        {logs.length === 0 && (
          <div className="px-6 mt-8">
            <EmptyState
              icon="local_cafe"
              message={t('home.noBrewLogs')}
            />
          </div>
        )}

        {/* Stats */}
        <motion.section
          className="px-6 mt-6 mb-8"
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-neutral-dark dark:text-white">{t('home.thisWeek')}</h2>
              <button
                onClick={() => navigate('/brew')}
                className="text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
              >
                {t('home.viewAll')}
              </button>
            </div>
            <div className="space-y-3">
              {weekLogs.slice(0, 5).map((log) => (
                <div key={log.documentId}>
                  <BrewLogListItem log={log} />
                </div>
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
}
