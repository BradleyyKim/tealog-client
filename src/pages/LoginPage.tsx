import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useI18n } from '@/contexts/I18nContext';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const { login, register } = useAuth();
  const { t } = useI18n();
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [identifier, setIdentifier] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isRegister) {
        await register(username, email, password);
      } else {
        await login(identifier, password);
      }
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
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="material-icons text-primary text-4xl">spa</span>
          </div>
          <h1 className="text-3xl font-bold text-neutral-dark dark:text-white font-display">
            {t('app.name')}
          </h1>
          <p className="text-text-muted mt-2 text-sm">{t('app.tagline')}</p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-surface-dark rounded-2xl p-6 shadow-zen space-y-4 border border-neutral-light dark:border-neutral-dark/30"
        >
          <h2 className="text-lg font-bold text-neutral-dark dark:text-white">
            {isRegister ? t('login.createAccount') : t('login.welcomeBack')}
          </h2>

          {isRegister ? (
            <>
              <div>
                <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">
                  {t('login.username')}
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  minLength={3}
                  className="w-full px-4 py-3 rounded-xl bg-bg-light dark:bg-bg-dark border-none text-sm text-neutral-dark dark:text-white placeholder-text-muted/50 focus:ring-2 focus:ring-primary/50 outline-none"
                  placeholder="alex"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">
                  {t('login.email')}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-bg-light dark:bg-bg-dark border-none text-sm text-neutral-dark dark:text-white placeholder-text-muted/50 focus:ring-2 focus:ring-primary/50 outline-none"
                  placeholder="alex@example.com"
                />
              </div>
            </>
          ) : (
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
          )}

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
            {loading ? t('common.pleaseWait') : isRegister ? t('login.signUp') : t('login.signIn')}
          </button>

          <p className="text-center text-sm text-text-muted">
            {isRegister ? t('login.alreadyHaveAccount') : t('login.noAccount')}{' '}
            <button
              type="button"
              onClick={() => setIsRegister(!isRegister)}
              className="text-primary font-semibold hover:underline bg-transparent border-none p-0 cursor-pointer"
            >
              {isRegister ? t('login.signIn') : t('login.signUp')}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
