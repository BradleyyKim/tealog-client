import { useNavigate } from 'react-router-dom';
import type { TeaLeaf } from '@/types';
import { getImageUrl } from '@/lib/utils';
import { useI18n } from '@/contexts/I18nContext';
import CategoryBadge from '@/components/ui/CategoryBadge';
import { motion } from 'framer-motion';
import { cardHover } from '@/lib/animations';

export default function TeaCard({ tea }: { tea: TeaLeaf }) {
  const navigate = useNavigate();
  const { t } = useI18n();
  const imgUrl = tea.cover_photo?.url ? getImageUrl(tea.cover_photo.url) : null;

  return (
    <motion.article
      onClick={() => navigate(`/teas/${tea.documentId}/edit`)}
      className="group relative bg-white dark:bg-zinc-800 rounded-2xl p-3 shadow-zen hover:shadow-zen-hover transition-all duration-300 border border-transparent hover:border-primary/20 flex items-center gap-4 cursor-pointer"
      {...cardHover}
    >
      <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden rounded-xl bg-gray-100 dark:bg-neutral-dark/30">
        {imgUrl ? (
          <img
            src={imgUrl}
            alt={tea.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="material-icons-outlined text-2xl text-text-muted/40">eco</span>
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0 py-1">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-gray-900 dark:text-gray-100 text-lg leading-tight truncate pr-2">
            {tea.name}
          </h3>
          {tea.in_stock === false && (
            <span className="text-xs text-text-muted bg-neutral-light dark:bg-neutral-dark/50 px-2 py-0.5 rounded font-medium">
              {t('component.out')}
            </span>
          )}
        </div>
        <p className="text-text-muted text-xs mt-1 mb-2 font-medium">
          {[tea.year, tea.brand_origin].filter(Boolean).join(' \u2022 ') || '\u00A0'}
        </p>
        {tea.category && <CategoryBadge category={tea.category} />}
      </div>
    </motion.article>
  );
}
