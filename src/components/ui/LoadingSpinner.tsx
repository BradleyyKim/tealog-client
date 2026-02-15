import { useState } from 'react';
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

export default function LoadingSpinner() {
  const [quote] = useState(() => LOADING_QUOTES[Math.floor(Math.random() * LOADING_QUOTES.length)]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-8 gap-6">
      <div className="w-8 h-8 border-3 border-primary/30 border-t-primary rounded-full animate-spin" />
      <AnimatePresence>
        <motion.p
          key={quote}
          className="text-sm text-text-muted text-center leading-relaxed"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {quote}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
