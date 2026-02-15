import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';

const SPLASH_KEY = 'chacha_splash_shown';

const SPLASH_LINES = [
  { text: 'ChaCha', style: 'title' as const },
  { text: '천천히 한 걸음씩.', style: 'body' as const },
  { text: '차차 나아질거예요.', style: 'body' as const },
  { text: '사랑하는 찬미의 삶을 응원합니다.', style: 'body' as const },
  { text: '당신의 삶을 함께 음미하겠습니다.', style: 'body' as const },
];

const LINE_DELAYS = [0.5, 1.5, 2.5, 3.5, 4.5]; // seconds
const MIN_DISPLAY_TIME = 6000; // ms

export default function SplashScreen({ children }: { children: React.ReactNode }) {
  const { isReady } = useAuth();
  const [alreadyShown] = useState(() => !!sessionStorage.getItem(SPLASH_KEY));
  const [show, setShow] = useState(!alreadyShown);
  const [minTimePassed, setMinTimePassed] = useState(false);

  // Minimum animation timer
  useEffect(() => {
    if (!show) return;
    const timer = setTimeout(() => setMinTimePassed(true), MIN_DISPLAY_TIME);
    return () => clearTimeout(timer);
  }, [show]);

  // Dismiss splash when both conditions met
  useEffect(() => {
    if (show && isReady && minTimePassed) {
      sessionStorage.setItem(SPLASH_KEY, '1');
      setShow(false);
    }
  }, [show, isReady, minTimePassed]);

  // Session revisit: skip splash, wait for isReady only
  if (alreadyShown && !isReady) {
    return (
      <div className="fixed inset-0 z-[9999] bg-bg-light dark:bg-bg-dark flex items-center justify-center">
        <motion.span
          className="material-icons text-primary text-4xl"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
        >
          autorenew
        </motion.span>
      </div>
    );
  }

  return (
    <>
      <AnimatePresence>
        {show && (
          <motion.div
            key="splash"
            className="fixed inset-0 z-[9999] bg-bg-light dark:bg-bg-dark flex flex-col items-center justify-center"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Tea icon */}
            <motion.span
              className="material-icons text-primary text-6xl"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1, rotate: [0, -8, 8, -4, 0] }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              spa
            </motion.span>

            {/* Sequential text lines */}
            {SPLASH_LINES.map((line, i) => (
              <motion.p
                key={i}
                className={
                  line.style === 'title'
                    ? 'text-4xl font-bold text-neutral-dark dark:text-white mt-4 font-display'
                    : 'text-text-muted text-sm mt-3 text-center px-8'
                }
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: LINE_DELAYS[i], duration: 0.5 }}
              >
                {line.text}
              </motion.p>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {children}
    </>
  );
}
