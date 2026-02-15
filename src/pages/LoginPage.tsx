import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useI18n } from '@/contexts/I18nContext';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const LOADING_QUOTES = [
  '천천히 차를 음미하며 차차 나아지다.',
  '기다림은 잃어버린 시간이 아니라, 맛이 깊어지는 시간이다.',
  '찻잎이 물을 만나 춤을 춘다.',
  '비워야 채울 수 있다. 찻잔도, 마음도.',
  '가장 맛있는 차는 지금 내 앞에 있는 이 차다.',
  '차 한 잔에 우주가 담겨 있다.',
  '고요함 속에 들리는 물 따르는 소리, 그게 명상이다.',
  '느리게, 더 깊게.',
  '향기로 기억되는 오늘.',
  '지금, 당신 곁의 온기.',
  '생각의 쉼표, 차 한 잔.',
  '오늘의 차, 내일의 힘.',
];

export default function LoginPage() {
  const { login } = useAuth();
  const { t } = useI18n();
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(() => Math.floor(Math.random() * LOADING_QUOTES.length));

  // Rotate quotes every 4 seconds while loading
  useEffect(() => {
    if (!loading) return;
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % LOADING_QUOTES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [loading]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(identifier, password);
      navigate('/', { replace: true });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : t('login.authFailed'));
      setLoading(false);
    }
  }, [identifier, password, login, navigate, t]);

  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <motion.div
            className="inline-flex items-center gap-2 mb-4"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          >
            <span className="material-icons text-primary text-4xl">spa</span>
          </motion.div>
          <motion.h1
            className="text-3xl font-bold text-neutral-dark dark:text-white font-display"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
          >
            {t('app.name')}
          </motion.h1>
          <motion.p
            className="text-text-muted mt-2 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            {t('app.tagline')}
          </motion.p>
        </div>

        <AnimatePresence mode="wait">
          {loading ? (
            /* Loading state: quote + spinner */
            <motion.div
              key="loading"
              className="bg-white dark:bg-surface-dark rounded-2xl p-8 shadow-zen border border-neutral-light dark:border-neutral-dark/30 flex flex-col items-center justify-center min-h-[240px]"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-8 h-8 border-3 border-primary/30 border-t-primary rounded-full animate-spin mb-8" />
              <AnimatePresence mode="wait">
                <motion.p
                  key={quoteIndex}
                  className="text-sm text-neutral-mid dark:text-gray-400 text-center leading-relaxed px-2"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4 }}
                >
                  {LOADING_QUOTES[quoteIndex]}
                </motion.p>
              </AnimatePresence>
            </motion.div>
          ) : (
            /* Login form */
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="bg-white dark:bg-surface-dark rounded-2xl p-6 shadow-zen space-y-4 border border-neutral-light dark:border-neutral-dark/30"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: 0.2, duration: 0.45, ease: 'easeOut' }}
            >
              <h2 className="text-lg font-bold text-neutral-dark dark:text-white">
                {t('login.welcomeBack')}
              </h2>

              <div>
                <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">
                  {t('login.emailOrUsername')}
                </label>
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-bg-light dark:bg-bg-dark border-none text-sm text-neutral-dark dark:text-white placeholder-text-muted/50 focus:ring-2 focus:ring-primary/50 outline-none"
                  placeholder="alex@example.com"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">
                  {t('login.password')}
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full px-4 py-3 rounded-xl bg-bg-light dark:bg-bg-dark border-none text-sm text-neutral-dark dark:text-white placeholder-text-muted/50 focus:ring-2 focus:ring-primary/50 outline-none"
                  placeholder="••••••"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-white font-bold py-3 rounded-xl shadow-lg shadow-primary/20 hover:bg-primary-dark transition-colors"
              >
                {t('login.signIn')}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
