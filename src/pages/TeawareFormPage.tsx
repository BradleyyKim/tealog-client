import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { teawareSchema, type TeawareSchemaType } from '@/schemas/teaware';
import { useTeaware, useCreateTeaware, useUpdateTeaware, useDeleteTeaware } from '@/hooks/useTeaware';
import { useI18n } from '@/contexts/I18nContext';
import { TEAWARE_TYPES, TEAWARE_STATUSES } from '@/lib/constants';
import type { TranslationKey } from '@/lib/i18n';
import PageHeader from '@/components/layout/PageHeader';
import ImageUpload from '@/components/ui/ImageUpload';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import toast from 'react-hot-toast';

export default function TeawareFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useI18n();
  const isEdit = !!id;

  const { data: existing, isLoading } = useTeaware(id);
  const createMutation = useCreateTeaware();
  const updateMutation = useUpdateTeaware();
  const deleteMutation = useDeleteTeaware();

  const [photoId, setPhotoId] = useState<number | null>(null);
  const [showDelete, setShowDelete] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TeawareSchemaType>({
    resolver: zodResolver(teawareSchema),
  });

  useEffect(() => {
    if (existing) {
      reset({
        name: existing.name,
        type: existing.type || '',
        material: existing.material || '',
        volume_ml: existing.volume_ml ?? undefined,
        status: existing.status || 'Active',
        is_favorite: existing.is_favorite ?? false,
      });
    }
  }, [existing, reset]);

  const onSubmit = async (values: TeawareSchemaType) => {
    try {
      const data: Record<string, unknown> = {
        ...values,
        volume_ml: values.volume_ml ?? null,
      };
      if (photoId) data.photo = photoId;

      if (isEdit) {
        await updateMutation.mutateAsync({ documentId: id!, data });
        toast.success(t('toast.teawareUpdated'));
      } else {
        await createMutation.mutateAsync(data as never);
        toast.success(t('toast.teawareAdded'));
      }
      navigate('/teaware', { replace: true });
    } catch {
      toast.error(t('toast.saveFailed'));
    }
  };

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync(id!);
      toast.success(t('toast.teawareDeleted'));
      navigate('/teaware', { replace: true });
    } catch {
      toast.error(t('toast.deleteFailed'));
    }
  };

  if (isEdit && isLoading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark">
      <PageHeader title={isEdit ? t('teawareForm.edit') : t('teawareForm.add')} />

      <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-6 space-y-5 max-w-lg mx-auto">
        <ImageUpload
          currentUrl={existing?.photo?.url}
          onUploaded={(id) => setPhotoId(id)}
        />

        <div>
          <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">
            {t('teawareForm.name')} *
          </label>
          <input
            {...register('name')}
            className="w-full px-4 py-3 rounded-xl bg-white dark:bg-surface-dark text-sm text-neutral-dark dark:text-white border border-neutral-light dark:border-neutral-dark/50 focus:ring-2 focus:ring-primary/50 outline-none"
            placeholder="e.g. Kyusu Side-Handle"
          />
          {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">
              {t('teawareForm.type')}
            </label>
            <select
              {...register('type')}
              className="w-full px-4 py-3 rounded-xl bg-white dark:bg-surface-dark text-sm text-neutral-dark dark:text-white border border-neutral-light dark:border-neutral-dark/50 focus:ring-2 focus:ring-primary/50 outline-none appearance-none"
            >
              <option value="">{t('teawareForm.selectType')}</option>
              {TEAWARE_TYPES.map((tw) => (
                <option key={tw} value={tw}>{t(`teawareType.${tw}` as TranslationKey)}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">
              {t('teawareForm.status')}
            </label>
            <select
              {...register('status')}
              className="w-full px-4 py-3 rounded-xl bg-white dark:bg-surface-dark text-sm text-neutral-dark dark:text-white border border-neutral-light dark:border-neutral-dark/50 focus:ring-2 focus:ring-primary/50 outline-none appearance-none"
            >
              {TEAWARE_STATUSES.map((s) => (
                <option key={s} value={s}>{t(`status.${s}` as TranslationKey)}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">
              {t('teawareForm.material')}
            </label>
            <input
              {...register('material')}
              className="w-full px-4 py-3 rounded-xl bg-white dark:bg-surface-dark text-sm text-neutral-dark dark:text-white border border-neutral-light dark:border-neutral-dark/50 focus:ring-2 focus:ring-primary/50 outline-none"
              placeholder="e.g. Yixing Clay"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">
              {t('teawareForm.volumeMl')}
            </label>
            <input
              {...register('volume_ml', { setValueAs: (v: string) => v === '' ? undefined : Number(v) })}
              type="number"
              className="w-full px-4 py-3 rounded-xl bg-white dark:bg-surface-dark text-sm text-neutral-dark dark:text-white border border-neutral-light dark:border-neutral-dark/50 focus:ring-2 focus:ring-primary/50 outline-none"
              placeholder="150"
            />
          </div>
        </div>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            {...register('is_favorite')}
            className="w-5 h-5 rounded border-neutral-light text-primary focus:ring-primary/50"
          />
          <span className="text-sm font-medium text-neutral-dark dark:text-white">{t('teawareForm.favorite')}</span>
        </label>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary text-white font-bold py-3 rounded-xl shadow-lg shadow-primary/20 hover:bg-primary-dark transition-colors disabled:opacity-50"
        >
          {isSubmitting ? t('common.saving') : isEdit ? t('teawareForm.updateTeaware') : t('teawareForm.addTeaware')}
        </button>

        {isEdit && (
          <button
            type="button"
            onClick={() => setShowDelete(true)}
            className="w-full py-3 rounded-xl text-red-500 font-medium text-sm hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
          >
            {t('teawareForm.deleteTeaware')}
          </button>
        )}
      </form>

      <ConfirmDialog
        open={showDelete}
        title={t('teawareForm.deleteTitle')}
        message={t('teawareForm.deleteMessage')}
        confirmLabel={t('common.delete')}
        onConfirm={handleDelete}
        onCancel={() => setShowDelete(false)}
      />
    </div>
  );
}
