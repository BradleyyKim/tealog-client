import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTeawares } from '@/hooks/useTeaware';
import { useI18n } from '@/contexts/I18nContext';
import TeawareCard from '@/components/domain/TeawareCard';
import FilterChips from '@/components/ui/FilterChips';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import EmptyState from '@/components/ui/EmptyState';
import { TEAWARE_TYPES } from '@/lib/constants';
import type { TranslationKey } from '@/lib/i18n';
import { motion } from 'framer-motion';
import { pageTransition, pageTransitionProps, staggerContainer, staggerItem } from '@/lib/animations';

export default function TeawareListPage() {
  const navigate = useNavigate();
  const { t } = useI18n();
  const { data: teawares, isLoading } = useTeawares();
  const [typeFilter, setTypeFilter] = useState('');

  const filterOptions = useMemo(
    () => [
      { label: t('common.all'), value: '' },
      ...TEAWARE_TYPES.map((tw) => ({ label: t(`teawareType.${tw}` as TranslationKey), value: tw })),
    ],
    [t],
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
          <button
            onClick={() => navigate('/teaware/new')}
            className="w-10 h-10 rounded-full bg-primary flex items-center justify-center hover:bg-primary-dark transition-colors"
          >
            <span className="material-icons text-white text-xl">add</span>
          </button>
        </div>
        <FilterChips options={filterOptions} selected={typeFilter} onChange={setTypeFilter} />
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

        <motion.div
          className="grid grid-cols-2 gap-4"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {filtered.map((tw) => (
            <motion.div key={tw.documentId} variants={staggerItem}>
              <TeawareCard teaware={tw} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
