import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { useBrewLog, useDeleteBrewLog } from '@/hooks/useBrewLogs';
import { useI18n } from '@/contexts/I18nContext';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import StarRating from '@/components/ui/StarRating';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import { getImageUrl } from '@/lib/utils';
import toast from 'react-hot-toast';

export default function BrewLogDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useI18n();
  const { data: log, isLoading } = useBrewLog(id);
  const deleteMutation = useDeleteBrewLog();
  const [showDelete, setShowDelete] = useState(false);

  if (isLoading) return <LoadingSpinner />;
  if (!log) {
    return (
      <div className="min-h-screen flex items-center justify-center text-text-muted">
        {t('brewDetail.notFound')}
      </div>
    );
  }

  const heroImg = log.photos?.[0]?.url
    ? getImageUrl(log.photos[0].url)
    : log.tea?.cover_photo?.url
      ? getImageUrl(log.tea.cover_photo.url)
      : null;

  const dateStr = log.brewed_at
    ? format(new Date(log.brewed_at), "MMMM do, yyyy '\u2022' hh:mm a")
    : '';

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync(log.documentId);
      toast.success(t('toast.brewLogDeleted'));
      navigate('/', { replace: true });
    } catch {
      toast.error(t('toast.deleteFailed'));
    }
  };

  return (
    <div className="min-h-screen bg-stone-surface dark:bg-stone-surface-dark flex flex-col">
      {/* Header over hero */}
      <header className="absolute top-0 left-0 w-full p-6 z-20 flex justify-between items-center bg-gradient-to-b from-black/40 to-transparent">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-all border border-white/10 group"
        >
          <span className="material-icons-outlined text-xl group-hover:-translate-x-0.5 transition-transform">
            arrow_back
          </span>
        </button>
      </header>

      {/* Hero Image */}
      <div className="relative w-full h-80 shrink-0">
        <div className="absolute inset-0 bg-black/10 z-10" />
        {heroImg ? (
          <img src={heroImg} alt={log.tea?.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-bg-dark/40 flex items-center justify-center">
            <span className="material-icons text-6xl text-primary/40">local_cafe</span>
          </div>
        )}
        {log.water_temp && (
          <div className="absolute bottom-6 left-6 z-20">
            <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
              {log.water_temp}°C
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 bg-stone-surface dark:bg-stone-surface-dark relative -mt-6 rounded-t-3xl z-30 px-6 pt-8 pb-8">
        {/* Title */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-serif font-medium text-gray-900 dark:text-white leading-tight mb-1">
              {log.tea?.name || t('brewDetail.unnamed')}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium flex items-center gap-1">
              <span className="material-icons-outlined text-base">calendar_today</span>
              {dateStr}
            </p>
          </div>
          {log.rating && (
            <div className="flex flex-col items-end">
              <StarRating value={log.rating} size="md" />
              <span className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                {log.rating}.0 / 5.0
              </span>
            </div>
          )}
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {log.water_temp && (
            <div className="flex flex-col items-center group">
              <div className="w-14 h-14 rounded-full bg-primary/20 dark:bg-primary/10 flex items-center justify-center mb-2">
                <span className="material-icons-outlined text-2xl text-primary-dark dark:text-primary">
                  thermostat
                </span>
              </div>
              <span className="text-sm font-bold text-gray-800 dark:text-gray-200">
                {log.water_temp}°C
              </span>
              <span className="text-xs text-gray-400 uppercase tracking-wide">{t('brewDetail.temp')}</span>
            </div>
          )}
          {log.steeping_details && (
            <div className="flex flex-col items-center group">
              <div className="w-14 h-14 rounded-full bg-primary/20 dark:bg-primary/10 flex items-center justify-center mb-2">
                <span className="material-icons-outlined text-2xl text-primary-dark dark:text-primary">
                  timer
                </span>
              </div>
              <span className="text-sm font-bold text-gray-800 dark:text-gray-200">
                {log.steeping_details}
              </span>
              <span className="text-xs text-gray-400 uppercase tracking-wide">{t('brewDetail.steep')}</span>
            </div>
          )}
          {log.leaf_amount_g && (
            <div className="flex flex-col items-center group">
              <div className="w-14 h-14 rounded-full bg-primary/20 dark:bg-primary/10 flex items-center justify-center mb-2">
                <span className="material-icons-outlined text-2xl text-primary-dark dark:text-primary">
                  scale
                </span>
              </div>
              <span className="text-sm font-bold text-gray-800 dark:text-gray-200">
                {log.leaf_amount_g}g
              </span>
              <span className="text-xs text-gray-400 uppercase tracking-wide">{t('brewDetail.leaf')}</span>
            </div>
          )}
        </div>

        <hr className="border-gray-200 dark:border-gray-700 mb-8 border-dashed" />

        {/* Review / Tasting Notes */}
        {log.review && (
          <div className="mb-10">
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4 font-display">
              {t('brewDetail.tastingNotes')}
            </h2>
            <p className="font-serif text-lg leading-relaxed text-gray-700 dark:text-gray-300 italic">
              "{log.review}"
            </p>
          </div>
        )}

        {/* Equipment Used */}
        {(log.tea || (log.teawares && log.teawares.length > 0)) && (
          <div>
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4 font-display">
              {t('brewDetail.equipment')}
            </h2>
            <div className="flex flex-wrap gap-3">
              {log.tea && (
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    {log.tea.name}
                  </span>
                </span>
              )}
              {log.teawares?.map((tw) => (
                <span
                  key={tw.documentId}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm"
                >
                  <span className="material-icons-outlined text-base text-gray-400">coffee</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    {tw.name}
                  </span>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Action Bar */}
      <div className="sticky bottom-0 bg-white/80 dark:bg-stone-surface-dark/90 backdrop-blur-md border-t border-gray-100 dark:border-gray-800 p-4 flex gap-4 z-40">
        <button
          onClick={() => navigate(`/brew/${log.documentId}/edit`)}
          className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
        >
          <span className="material-icons-outlined text-xl">edit</span>
          {t('brewDetail.editLog')}
        </button>
        <button
          onClick={() => setShowDelete(true)}
          className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 p-3 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          <span className="material-icons-outlined text-xl">delete_outline</span>
        </button>
      </div>

      <ConfirmDialog
        open={showDelete}
        title={t('brewDetail.deleteTitle')}
        message={t('brewDetail.deleteMessage')}
        confirmLabel={t('common.delete')}
        onConfirm={handleDelete}
        onCancel={() => setShowDelete(false)}
      />
    </div>
  );
}
