import { useNavigate } from 'react-router-dom';
import type { Teaware } from '@/types';
import { getImageUrl } from '@/lib/utils';
import { useI18n } from '@/contexts/I18nContext';
import type { TranslationKey } from '@/lib/i18n';
import { motion } from 'framer-motion';
import { cardHover } from '@/lib/animations';

export default function TeawareCard({ teaware }: { teaware: Teaware }) {
  const navigate = useNavigate();
  const { t } = useI18n();
  const imgUrl = teaware.photo?.url ? getImageUrl(teaware.photo.url) : null;
  const typeKey = teaware.type ? `teawareType.${teaware.type}` as TranslationKey : null;
  const typeLabel = typeKey ? (() => { const v = t(typeKey); return v === typeKey ? teaware.type : v; })() : null;

  return (
    <motion.div
      onClick={() => navigate(`/teaware/${teaware.documentId}/edit`)}
      className="group cursor-pointer"
      {...cardHover}
    >
      <div className="relative overflow-hidden rounded-xl bg-neutral-light/50 dark:bg-neutral-dark/30 mb-3 shadow-sm hover:shadow-xl transition-all duration-500 aspect-square">
        {imgUrl ? (
          <img
            src={imgUrl}
            alt={teaware.name}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="material-icons-outlined text-4xl text-text-muted/30">coffee</span>
          </div>
        )}
        {teaware.is_favorite && (
          <div className="absolute top-2 right-2">
            <span className="material-icons text-red-500 text-sm bg-white/80 rounded-full p-1">favorite</span>
          </div>
        )}
        {teaware.status && teaware.status !== 'Active' && (
          <div className="absolute top-2 left-2">
            <span className="px-2 py-1 bg-white/90 text-neutral-dark text-[10px] font-bold uppercase tracking-wider rounded backdrop-blur-sm">
              {t(`status.${teaware.status}` as TranslationKey)}
            </span>
          </div>
        )}
      </div>
      <div className="px-1">
        <h3 className="text-sm font-medium text-neutral-dark dark:text-white group-hover:text-primary-dark dark:group-hover:text-primary transition-colors truncate">
          {teaware.name}
        </h3>
        <p className="text-xs text-text-muted mt-0.5">
          {[typeLabel, teaware.material]
            .filter(Boolean)
            .join(' \u2022 ') || '\u00A0'}
        </p>
        {teaware.volume_ml && (
          <p className="text-xs text-text-muted">{teaware.volume_ml}ml</p>
        )}
      </div>
    </motion.div>
  );
}
