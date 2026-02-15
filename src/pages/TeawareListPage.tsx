import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTeawares } from '@/hooks/useTeaware';
import { useI18n } from '@/contexts/I18nContext';
import { useTeawareTypes, DEFAULT_TEAWARE_TYPES } from '@/hooks/useCategories';
import TeawareCard from '@/components/domain/TeawareCard';
import FilterChips from '@/components/ui/FilterChips';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import EmptyState from '@/components/ui/EmptyState';
import CategoryManagerModal from '@/components/ui/CategoryManagerModal';
import type { TranslationKey } from '@/lib/i18n';
import { motion } from 'framer-motion';
import { pageTransition, pageTransitionProps } from '@/lib/animations';

export default function TeawareListPage() {
  const navigate = useNavigate();
  const { t } = useI18n();
  const { data: teawares, isLoading } = useTeawares();
  const { types, add, remove } = useTeawareTypes();
  const [typeFilter, setTypeFilter] = useState('');
  const [showManager, setShowManager] = useState(false);

  const filterOptions = useMemo(
    () => [
      { label: t('common.all'), value: '' },
      ...types.map((tw) => {
        const key = `teawareType.${tw}` as TranslationKey;
        const translated = t(key);
        return { label: translated === key ? tw : translated, value: tw };
      }),
    ],
    [t, types],
  );

  const filtered = useMemo(() => {
    if (!teawares) return [];
    if (!typeFilter) return teawares;
    return teawares.filter((tw) => tw.type === typeFilter);
  }, [teawares, typeFilter]);

  return (
    <motion.div
      className="flex flex-col min-h-full"
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransitionProps}
    >
      {/* Header */}
      <header className="sticky top-0 z-20 bg-bg-light/90 dark:bg-bg-dark/90 backdrop-blur-md border-b border-primary/10 px-6 pt-10 pb-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="font-serif text-3xl text-gray-900 dark:text-gray-100 tracking-tight">
            {t('teaware.title')}
          </h1>
        </div>
        <FilterChips
          options={filterOptions}
          selected={typeFilter}
          onChange={setTypeFilter}
          onManage={() => setShowManager(true)}
        />
      </header>

      {/* Grid Content */}
      <div className="flex-1 px-6 py-6">
        {isLoading && <LoadingSpinner />}

        {!isLoading && filtered.length === 0 && (
          <EmptyState
            icon="coffee"
            message={teawares?.length ? t('teaware.noMatch') : t('teaware.empty')}
            actionLabel={!teawares?.length ? t('teaware.addTeaware') : undefined}
            onAction={!teawares?.length ? () => navigate('/teaware/new') : undefined}
          />
        )}

        {filtered.length > 0 && (
          <motion.div
            className="grid grid-cols-2 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
          >
            {filtered.map((tw) => (
              <div key={tw.documentId}>
                <TeawareCard teaware={tw} />
              </div>
            ))}
          </motion.div>
        )}
      </div>

      <CategoryManagerModal
        open={showManager}
        onClose={() => setShowManager(false)}
        title={t('categoryManager.teawareTitle')}
        categories={types}
        defaults={DEFAULT_TEAWARE_TYPES}
        translationPrefix="teawareType"
        onAdd={add}
        onRemove={remove}
      />
    </motion.div>
  );
}
