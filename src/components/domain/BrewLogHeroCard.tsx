import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import type { BrewLog } from '@/types';
import { getImageUrl } from '@/lib/utils';
import { useI18n } from '@/contexts/I18nContext';

export default function BrewLogHeroCard({ log }: { log: BrewLog }) {
  const navigate = useNavigate();
  const { t } = useI18n();
  const imgUrl = log.photos?.[0]?.url
    ? getImageUrl(log.photos[0].url)
    : log.tea?.cover_photo?.url
      ? getImageUrl(log.tea.cover_photo.url)
      : null;

  const dateStr = log.brewed_at
    ? format(new Date(log.brewed_at), "EEEE, h:mm a")
    : '';

  return (
    <div
      onClick={() => navigate(`/brew/${log.documentId}`)}
      className="min-w-[85%] snap-center relative aspect-[4/5] rounded-xl overflow-hidden group shadow-soft cursor-pointer"
    >
      {imgUrl ? (
        <img
          src={imgUrl}
          alt={log.tea?.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-primary/20 to-bg-dark/50 flex items-center justify-center">
          <span className="material-icons text-6xl text-primary/40">local_cafe</span>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/90 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 w-full p-5 text-white">
        <div className="flex items-center gap-2 mb-2">
          {log.water_temp && (
            <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded">
              {log.water_temp}°C
            </span>
          )}
          {log.rating && (
            <span className="bg-white/20 backdrop-blur-md text-white text-xs font-bold px-2 py-1 rounded">
              {log.rating}/5
            </span>
          )}
        </div>
        <h3 className="text-2xl font-bold mb-1">{log.tea?.name || t('brewDetail.unnamed')}</h3>
        <p className="text-white/70 text-sm flex items-center gap-1">
          <span className="material-icons-outlined text-sm">schedule</span>
          {dateStr}
        </p>
      </div>
    </div>
  );
}
