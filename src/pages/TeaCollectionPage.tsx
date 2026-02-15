import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTeaLeaves } from '@/hooks/useTeaLeaves';
import { useI18n } from '@/contexts/I18nContext';
import { useTeaCategories, DEFAULT_TEA_CATEGORIES } from '@/hooks/useCategories';
import TeaCard from '@/components/domain/TeaCard';
import SearchBar from '@/components/ui/SearchBar';
import FilterChips from '@/components/ui/FilterChips';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import EmptyState from '@/components/ui/EmptyState';
import CategoryManagerModal from '@/components/ui/CategoryManagerModal';
import type { TranslationKey } from '@/lib/i18n';
import { motion } from 'framer-motion';
import { pageTransition, pageTransitionProps } from '@/lib/animations';

export default function TeaCollectionPage() {
  const navigate = useNavigate();
  const { t } = useI18n();
  const { data: teas, isLoading } = useTeaLeaves();
  const { categories, add, remove } = useTeaCategories();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [showManager, setShowManager] = useState(false);

  const filterOptions = useMemo(
    () => [
      { label: t('common.all'), value: '' },
      ...categories.map((c) => {
        const key = `category.${c}` as TranslationKey;
        const translated = t(key);
        return { label: translated === key ? c : translated, value: c };
      }),
    ],
    [t, categories],
  );

  const filtered = useMemo(() => {
    if (!teas) return [];
    return teas.filter((tea) => {
      const matchSearch =
        !search ||
        tea.name.toLowerCase().includes(search.toLowerCase()) ||
        tea.brand_origin?.toLowerCase().includes(search.toLowerCase());
      const matchCategory = !category || tea.category === category;
      return matchSearch && matchCategory;
    });
  }, [teas, search, category]);

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
      <header className="sticky top-0 z-20 bg-surface-light/90 dark:bg-surface-dark/90 backdrop-blur-md border-b border-primary/10 px-6 pt-10 pb-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="font-serif text-3xl text-gray-900 dark:text-gray-100 tracking-tight">
            {t('teaCollection.title')}
          </h1>
        </div>
        <div className="mb-4">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder={t('teaCollection.searchPlaceholder')}
          />
        </div>
        <FilterChips
          options={filterOptions}
          selected={category}
          onChange={setCategory}
          onManage={() => setShowManager(true)}
        />
      </header>

      {/* Content */}
      <div className="flex-1 px-6 py-6">
        {isLoading && <LoadingSpinner />}

        {!isLoading && filtered.length === 0 && (
          <EmptyState
            icon="eco"
            message={teas?.length ? t('teaCollection.noMatch') : t('teaCollection.empty')}
            actionLabel={!teas?.length ? t('teaCollection.addTea') : undefined}
            onAction={!teas?.length ? () => navigate('/teas/new') : undefined}
          />
        )}

        {filtered.length > 0 && (
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
          >
            {filtered.map((tea) => (
              <div key={tea.documentId}>
                <TeaCard tea={tea} />
              </div>
            ))}
          </motion.div>
        )}
      </div>

      <CategoryManagerModal
        open={showManager}
        onClose={() => setShowManager(false)}
        title={t('categoryManager.title')}
        categories={categories}
        defaults={DEFAULT_TEA_CATEGORIES}
        translationPrefix="category"
        onAdd={add}
        onRemove={remove}
      />
    </motion.div>
  );
}
