import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { teaLeafSchema, type TeaLeafSchemaType } from '@/schemas/tea-leaf';
import { useTeaLeaf, useCreateTeaLeaf, useUpdateTeaLeaf, useDeleteTeaLeaf } from '@/hooks/useTeaLeaves';
import { useI18n } from '@/contexts/I18nContext';
import { TEA_CATEGORIES } from '@/lib/constants';
import type { TranslationKey } from '@/lib/i18n';
import PageHeader from '@/components/layout/PageHeader';
import ImageUpload from '@/components/ui/ImageUpload';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import toast from 'react-hot-toast';

export default function TeaFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useI18n();
  const isEdit = !!id;

  const { data: existing, isLoading } = useTeaLeaf(id);
  const createMutation = useCreateTeaLeaf();
  const updateMutation = useUpdateTeaLeaf();
  const deleteMutation = useDeleteTeaLeaf();

  const [photoId, setPhotoId] = useState<number | null>(null);
  const [showDelete, setShowDelete] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TeaLeafSchemaType>({
    resolver: zodResolver(teaLeafSchema),
  });

  useEffect(() => {
    if (existing) {
      reset({
        name: existing.name,
        category: existing.category || '',
        brand_origin: existing.brand_origin || '',
        year: existing.year ?? undefined,
        in_stock: existing.in_stock ?? true,
        tasting_notes: existing.tasting_notes || '',
      });
    }
  }, [existing, reset]);

  const onSubmit = async (values: TeaLeafSchemaType) => {
    try {
      const data: Record<string, unknown> = {
        ...values,
        year: values.year ?? null,
      };
      if (photoId) data.cover_photo = photoId;

      if (isEdit) {
        await updateMutation.mutateAsync({ documentId: id!, data });
        toast.success(t('toast.teaUpdated'));
      } else {
        await createMutation.mutateAsync(data as never);
        toast.success(t('toast.teaAdded'));
      }
      navigate('/teas', { replace: true });
    } catch {
      toast.error(t('toast.saveFailed'));
    }
  };

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync(id!);
      toast.success(t('toast.teaDeleted'));
      navigate('/teas', { replace: true });
    } catch {
      toast.error(t('toast.deleteFailed'));
    }
  };

  if (isEdit && isLoading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark">
      <PageHeader title={isEdit ? t('teaForm.edit') : t('teaForm.add')} />

      <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-6 space-y-5 max-w-lg mx-auto">
        <ImageUpload
          currentUrl={existing?.cover_photo?.url}
          onUploaded={(id) => setPhotoId(id)}
        />

        <div>
          <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">
            {t('teaForm.name')} *
          </label>
          <input
            {...register('name')}
            className="w-full px-4 py-3 rounded-xl bg-white dark:bg-surface-dark text-sm text-neutral-dark dark:text-white border border-neutral-light dark:border-neutral-dark/50 focus:ring-2 focus:ring-primary/50 outline-none"
            placeholder="e.g. Iron Goddess Oolong"
          />
          {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">
            {t('teaForm.category')}
          </label>
          <select
            {...register('category')}
            className="w-full px-4 py-3 rounded-xl bg-white dark:bg-surface-dark text-sm text-neutral-dark dark:text-white border border-neutral-light dark:border-neutral-dark/50 focus:ring-2 focus:ring-primary/50 outline-none appearance-none"
          >
            <option value="">{t('teaForm.selectCategory')}</option>
            {TEA_CATEGORIES.map((c) => (
              <option key={c} value={c}>{t(`category.${c}` as TranslationKey)}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">
              {t('teaForm.origin')}
            </label>
            <input
              {...register('brand_origin')}
              className="w-full px-4 py-3 rounded-xl bg-white dark:bg-surface-dark text-sm text-neutral-dark dark:text-white border border-neutral-light dark:border-neutral-dark/50 focus:ring-2 focus:ring-primary/50 outline-none"
              placeholder="e.g. Anxi"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">
              {t('teaForm.year')}
            </label>
            <input
              {...register('year', { setValueAs: (v: string) => v === '' ? undefined : Number(v) })}
              type="number"
              className="w-full px-4 py-3 rounded-xl bg-white dark:bg-surface-dark text-sm text-neutral-dark dark:text-white border border-neutral-light dark:border-neutral-dark/50 focus:ring-2 focus:ring-primary/50 outline-none"
              placeholder="2023"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">
            {t('teaForm.tastingNotes')}
          </label>
          <textarea
            {...register('tasting_notes')}
            rows={3}
            className="w-full px-4 py-3 rounded-xl bg-white dark:bg-surface-dark text-sm text-neutral-dark dark:text-white border border-neutral-light dark:border-neutral-dark/50 focus:ring-2 focus:ring-primary/50 outline-none resize-none"
            placeholder={t('teaForm.tastingPlaceholder')}
          />
        </div>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            {...register('in_stock')}
            className="w-5 h-5 rounded border-neutral-light text-primary focus:ring-primary/50"
          />
          <span className="text-sm font-medium text-neutral-dark dark:text-white">{t('teaForm.inStock')}</span>
        </label>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary text-white font-bold py-3 rounded-xl shadow-lg shadow-primary/20 hover:bg-primary-dark transition-colors disabled:opacity-50"
        >
          {isSubmitting ? t('common.saving') : isEdit ? t('teaForm.updateTea') : t('teaForm.addTea')}
        </button>

        {isEdit && (
          <button
            type="button"
            onClick={() => setShowDelete(true)}
            className="w-full py-3 rounded-xl text-red-500 font-medium text-sm hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
          >
            {t('teaForm.deleteTea')}
          </button>
        )}
      </form>

      <ConfirmDialog
        open={showDelete}
        title={t('teaForm.deleteTitle')}
        message={t('teaForm.deleteMessage')}
        confirmLabel={t('common.delete')}
        onConfirm={handleDelete}
        onCancel={() => setShowDelete(false)}
      />
    </div>
  );
}
