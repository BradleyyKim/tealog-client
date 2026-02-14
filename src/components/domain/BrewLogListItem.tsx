import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import type { BrewLog } from '@/types';
import { getImageUrl, cn } from '@/lib/utils';
import { useI18n } from '@/contexts/I18nContext';

export default function BrewLogListItem({ log }: { log: BrewLog }) {
  const navigate = useNavigate();
  const { t } = useI18n();
  const imgUrl = log.photos?.[0]?.url
    ? getImageUrl(log.photos[0].url)
    : log.tea?.cover_photo?.url
      ? getImageUrl(log.tea.cover_photo.url)
      : null;

  const dateStr = log.brewed_at
    ? format(new Date(log.brewed_at), 'EEE, h:mm a')
    : '';

  return (
    <div
      onClick={() => navigate(`/brew/${log.documentId}`)}
      className="flex items-center gap-4 bg-white dark:bg-neutral-dark/20 p-3 rounded-xl border border-transparent hover:border-primary/30 transition-colors cursor-pointer"
    >
      <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-gray-100 dark:bg-neutral-dark/30">
        {imgUrl ? (
          <img src={imgUrl} alt={log.tea?.name || 'Brew'} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="material-icons-outlined text-xl text-text-muted/40">local_cafe</span>
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-bold text-neutral-dark dark:text-white text-sm truncate">
          {log.tea?.name || t('brewDetail.unnamed')}
        </h4>
        <p className="text-xs text-neutral-mid mt-0.5 truncate">{dateStr}</p>
      </div>
      {log.rating && (
        <div
          className={cn(
            'font-bold text-xs px-2 py-1 rounded',
            log.rating >= 4
              ? 'text-primary bg-primary/10'
              : 'text-neutral-mid bg-neutral-light dark:bg-neutral-dark/50',
          )}
        >
          {log.rating}/5
        </div>
      )}
    </div>
  );
}
