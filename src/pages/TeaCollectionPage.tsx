import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTeaLeaves } from '@/hooks/useTeaLeaves';
import { useI18n } from '@/contexts/I18nContext';
import TeaCard from '@/components/domain/TeaCard';
import SearchBar from '@/components/ui/SearchBar';
import FilterChips from '@/components/ui/FilterChips';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import EmptyState from '@/components/ui/EmptyState';
import { TEA_CATEGORIES } from '@/lib/constants';
import type { TranslationKey } from '@/lib/i18n';

export default function TeaCollectionPage() {
  const navigate = useNavigate();
  const { t } = useI18n();
  const { data: teas, isLoading } = useTeaLeaves();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  const filterOptions = useMemo(
    () => [
      { label: t('common.all'), value: '' },
      ...TEA_CATEGORIES.map((c) => ({ label: t(`category.${c}` as TranslationKey), value: c })),
    ],
    [t],
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
    <div className="flex flex-col min-h-full">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-surface-light/90 dark:bg-surface-dark/90 backdrop-blur-md border-b border-primary/10 px-6 pt-10 pb-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="font-serif text-3xl text-gray-900 dark:text-gray-100 tracking-tight">
            {t('teaCollection.title')}
          </h1>
          <button
            onClick={() => navigate('/teas/new')}
            className="w-10 h-10 rounded-full bg-primary flex items-center justify-center hover:bg-primary-dark transition-colors"
          >
            <span className="material-icons text-white text-xl">add</span>
          </button>
        </div>
        <div className="mb-4">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder={t('teaCollection.searchPlaceholder')}
          />
        </div>
        <FilterChips options={filterOptions} selected={category} onChange={setCategory} />
      </header>

      {/* Content */}
      <div className="flex-1 px-6 py-6 space-y-4">
        {isLoading && <LoadingSpinner />}

        {!isLoading && filtered.length === 0 && (
          <EmptyState
            icon="eco"
            message={teas?.length ? t('teaCollection.noMatch') : t('teaCollection.empty')}
            actionLabel={!teas?.length ? t('teaCollection.addTea') : undefined}
            onAction={!teas?.length ? () => navigate('/teas/new') : undefined}
          />
        )}

        {filtered.map((tea) => (
          <TeaCard key={tea.documentId} tea={tea} />
        ))}
      </div>
    </div>
  );
}
