import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { brewLogSchema, type BrewLogSchemaType } from '@/schemas/brew-log';
import { useBrewLog, useCreateBrewLog, useUpdateBrewLog } from '@/hooks/useBrewLogs';
import { useI18n } from '@/contexts/I18nContext';
import PageHeader from '@/components/layout/PageHeader';
import ImageUpload from '@/components/ui/ImageUpload';
import StarRating from '@/components/ui/StarRating';
import TeaSelector from '@/components/domain/TeaSelector';
import TeawareMultiSelect from '@/components/domain/TeawareMultiSelect';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

export default function BrewLogFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useI18n();
  const isEdit = !!id;

  const { data: existing, isLoading } = useBrewLog(id);
  const createMutation = useCreateBrewLog();
  const updateMutation = useUpdateBrewLog();

  const [photoIds, setPhotoIds] = useState<number[]>([]);
  const [selectedTea, setSelectedTea] = useState<string>('');
  const [selectedTeawares, setSelectedTeawares] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<BrewLogSchemaType>({
    resolver: zodResolver(brewLogSchema),
    defaultValues: {
      brewed_at: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
    },
  });

  useEffect(() => {
    if (existing) {
      reset({
        brewed_at: existing.brewed_at
          ? format(new Date(existing.brewed_at), "yyyy-MM-dd'T'HH:mm")
          : '',
        water_temp: existing.water_temp ?? undefined,
        water_type: existing.water_type || '',
        leaf_amount_g: existing.leaf_amount_g ?? undefined,
        steeping_details: existing.steeping_details || '',
        rating: existing.rating ?? undefined,
        review: existing.review || '',
      });
      if (existing.tea) setSelectedTea(existing.tea.documentId);
      if (existing.teawares) setSelectedTeawares(existing.teawares.map((tw) => tw.documentId));
    }
  }, [existing, reset]);

  const rating = watch('rating');

  const onSubmit = async (values: BrewLogSchemaType) => {
    try {
      const data: Record<string, unknown> = {
        ...values,
        water_temp: values.water_temp ?? null,
        leaf_amount_g: values.leaf_amount_g ?? null,
        rating: values.rating ?? null,
      };

      if (selectedTea) data.tea = selectedTea;
      if (selectedTeawares.length) data.teawares = selectedTeawares;
      if (photoIds.length) data.photos = photoIds;

      if (isEdit) {
        await updateMutation.mutateAsync({ documentId: id!, data });
        toast.success(t('toast.brewLogUpdated'));
        navigate(`/brew/${id}`, { replace: true });
      } else {
        const result = await createMutation.mutateAsync(data as never);
        toast.success(t('toast.brewLogCreated'));
        navigate(`/brew/${result.data.documentId}`, { replace: true });
      }
    } catch {
      toast.error(t('toast.saveFailed'));
    }
  };

  if (isEdit && isLoading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark">
      <PageHeader title={isEdit ? t('brewForm.edit') : t('brewForm.new')} />

      <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-6 space-y-5 max-w-lg mx-auto">
        <ImageUpload
          currentUrl={existing?.photos?.[0]?.url}
          onUploaded={(id) => setPhotoIds((prev) => [...prev, id])}
        />

        {/* Tea Selector */}
        <TeaSelector value={selectedTea} onChange={setSelectedTea} />

        {/* Date/Time */}
        <div>
          <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">
            {t('brewForm.brewDateTime')} *
          </label>
          <input
            type="datetime-local"
            {...register('brewed_at')}
            className="w-full px-4 py-3 rounded-xl bg-white dark:bg-surface-dark text-sm text-neutral-dark dark:text-white border border-neutral-light dark:border-neutral-dark/50 focus:ring-2 focus:ring-primary/50 outline-none"
          />
          {errors.brewed_at && (
            <p className="text-xs text-red-500 mt-1">{errors.brewed_at.message}</p>
          )}
        </div>

        {/* Brewing Parameters */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">
              {t('brewForm.tempC')}
            </label>
            <input
              type="number"
              {...register('water_temp', { setValueAs: (v: string) => v === '' ? undefined : Number(v) })}
              className="w-full px-4 py-3 rounded-xl bg-white dark:bg-surface-dark text-sm text-neutral-dark dark:text-white border border-neutral-light dark:border-neutral-dark/50 focus:ring-2 focus:ring-primary/50 outline-none"
              placeholder="85"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">
              {t('brewForm.steep')}
            </label>
            <input
              {...register('steeping_details')}
              className="w-full px-4 py-3 rounded-xl bg-white dark:bg-surface-dark text-sm text-neutral-dark dark:text-white border border-neutral-light dark:border-neutral-dark/50 focus:ring-2 focus:ring-primary/50 outline-none"
              placeholder="45s"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">
              {t('brewForm.leafG')}
            </label>
            <input
              type="number"
              step="0.1"
              {...register('leaf_amount_g', { setValueAs: (v: string) => v === '' ? undefined : Number(v) })}
              className="w-full px-4 py-3 rounded-xl bg-white dark:bg-surface-dark text-sm text-neutral-dark dark:text-white border border-neutral-light dark:border-neutral-dark/50 focus:ring-2 focus:ring-primary/50 outline-none"
              placeholder="5.0"
            />
          </div>
        </div>

        {/* Water Type */}
        <div>
          <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">
            {t('brewForm.waterType')}
          </label>
          <input
            {...register('water_type')}
            className="w-full px-4 py-3 rounded-xl bg-white dark:bg-surface-dark text-sm text-neutral-dark dark:text-white border border-neutral-light dark:border-neutral-dark/50 focus:ring-2 focus:ring-primary/50 outline-none"
            placeholder={t('brewForm.waterPlaceholder')}
          />
        </div>

        {/* Rating */}
        <div>
          <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">
            {t('brewForm.rating')}
          </label>
          <StarRating
            value={typeof rating === 'number' ? rating : 0}
            onChange={(v) => setValue('rating', v)}
            size="lg"
          />
        </div>

        {/* Teaware */}
        <TeawareMultiSelect value={selectedTeawares} onChange={setSelectedTeawares} />

        {/* Review */}
        <div>
          <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">
            {t('brewForm.tastingNotesReview')}
          </label>
          <textarea
            {...register('review')}
            rows={4}
            className="w-full px-4 py-3 rounded-xl bg-white dark:bg-surface-dark text-sm text-neutral-dark dark:text-white border border-neutral-light dark:border-neutral-dark/50 focus:ring-2 focus:ring-primary/50 outline-none resize-none"
            placeholder={t('brewForm.tastingPlaceholder')}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary text-white font-bold py-3 rounded-xl shadow-lg shadow-primary/20 hover:bg-primary-dark transition-colors disabled:opacity-50"
        >
          {isSubmitting ? t('common.saving') : isEdit ? t('brewForm.update') : t('brewForm.save')}
        </button>
      </form>
    </div>
  );
}
