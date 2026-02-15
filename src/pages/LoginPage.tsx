import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useI18n } from '@/contexts/I18nContext';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const { login } = useAuth();
  const { t } = useI18n();
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(identifier, password);
      navigate('/', { replace: true });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : t('login.authFailed'));
    } finally {
      setLoading(false);
    }
  };

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

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-surface-dark rounded-2xl p-6 shadow-zen space-y-4 border border-neutral-light dark:border-neutral-dark/30"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
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
            disabled={loading}
            className="w-full bg-primary text-white font-bold py-3 rounded-xl shadow-lg shadow-primary/20 hover:bg-primary-dark transition-colors disabled:opacity-50"
          >
            {loading ? t('common.pleaseWait') : t('login.signIn')}
          </button>
        </motion.form>
      </div>
    </div>
  );
}
