import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// Generate heart particles
function useHearts(count: number) {
  return useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 6,
        duration: 4 + Math.random() * 4,
        size: 10 + Math.random() * 14,
        opacity: 0.15 + Math.random() * 0.25,
      })),
    [count],
  );
}

export default function LetterPage() {
  const navigate = useNavigate();
  const hearts = useHearts(30);

  return (
    <div className="min-h-screen bg-rose-50 relative overflow-hidden">
      {/* Heart snow */}
      {hearts.map((h) => (
        <div
          key={h.id}
          className="absolute pointer-events-none select-none animate-heart-fall"
          style={{
            left: `${h.left}%`,
            top: -30,
            fontSize: h.size,
            opacity: h.opacity,
            animationDelay: `${h.delay}s`,
            animationDuration: `${h.duration}s`,
          }}
        >
          ❤️
        </div>
      ))}

      {/* Back button */}
      <div className="sticky top-0 z-20 p-4">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm"
        >
          <span className="material-icons-outlined text-neutral-dark">arrow_back</span>
        </button>
      </div>

      {/* Letter */}
      <motion.div
        className="relative z-10 px-6 pb-16 max-w-lg mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-rose-100">
          <p className="text-xs text-rose-400 font-semibold uppercase tracking-widest mb-6">
            To. 찬미
          </p>

          <div className="space-y-4 text-[15px] leading-relaxed text-neutral-700">
            <p>
              찬미가 매일 차를 마시며 행복해하는 모습을 볼 때마다 나도 참 좋았어.
              찻잎을 고르고, 다관을 데우고, 향을 맡으며 수첩에 꼼꼼히 기록하는
              그 모습이 얼마나 예쁘던지.
            </p>
            <p>
              그런데 종이에 적다 보면 나중에 다시 찾아보기도 힘들고, 사진을 붙일
              수도 없어서 아쉬울 때가 있잖아. 그래서 내가 제일 잘할 수 있는
              방법으로 찬미를 돕고 싶었어.
            </p>
            <p>
              이 안에는 자기가 좋아하는 차와 다구들을 예쁘게 정리해둘 수 있어.
              물 온도는 어땠는지, 찻잎은 얼마나 넣었는지 고민하지 말고 여기에
              작성해둬. 그리고 내가 찬미를 위한 '따뜻한 문장'들도 숨겨뒀어.
              힘들거나 지칠 때, 이 앱이 작은 위로가 되었으면 해.
              앞으로 더 좋은 찻자리를 많이 만들길 바래.
            </p>
            <p>
              영원히 사랑해 찬미야.
            </p>
          </div>

          <p className="text-right text-sm text-rose-400 font-semibold mt-8">
            From 찬미의 영원한 사랑 민영
          </p>
        </div>
      </motion.div>
    </div>
  );
}
