import { useState } from 'react';
import { useI18n } from '@/contexts/I18nContext';
import type { TranslationKey } from '@/lib/i18n';

interface CategoryManagerModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  categories: string[];
  defaults: string[];
  translationPrefix?: string;
  onAdd: (name: string) => void;
  onRemove: (name: string) => void;
}

export default function CategoryManagerModal({
  open,
  onClose,
  title,
  categories,
  defaults,
  translationPrefix,
  onAdd,
  onRemove,
}: CategoryManagerModalProps) {
  const { t } = useI18n();
  const [input, setInput] = useState('');

  if (!open) return null;

  const handleAdd = () => {
    const trimmed = input.trim();
    if (!trimmed || categories.includes(trimmed)) return;
    onAdd(trimmed);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white dark:bg-surface-dark rounded-2xl p-6 w-full max-w-sm shadow-xl max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-neutral-dark dark:text-white">{title}</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-neutral-dark/30 transition-colors"
          >
            <span className="material-icons text-text-muted text-xl">close</span>
          </button>
        </div>

        {/* Category list */}
        <div className="flex-1 overflow-y-auto space-y-2 mb-4">
          {categories.map((cat) => {
            const isDefault = defaults.includes(cat);
            return (
              <div
                key={cat}
                className="flex items-center justify-between py-2 px-3 rounded-xl bg-bg-light dark:bg-bg-dark"
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-neutral-dark dark:text-white">
                    {translationPrefix
                      ? (() => {
                          const key = `${translationPrefix}.${cat}` as TranslationKey;
                          const translated = t(key);
                          return translated === key ? cat : translated;
                        })()
                      : cat}
                  </span>
                  {isDefault && (
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-primary/10 text-primary">
                      {t('categoryManager.default')}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => onRemove(cat)}
                  disabled={isDefault}
                  className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <span className="material-icons text-red-500 text-lg">close</span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Add input */}
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t('categoryManager.placeholder')}
            className="flex-1 px-4 py-2.5 rounded-xl bg-bg-light dark:bg-bg-dark text-sm text-neutral-dark dark:text-white border border-neutral-light dark:border-neutral-dark/50 focus:ring-2 focus:ring-primary/50 outline-none"
          />
          <button
            onClick={handleAdd}
            disabled={!input.trim()}
            className="px-5 py-2.5 rounded-xl bg-primary text-white font-bold text-sm disabled:opacity-50 transition-colors"
          >
            {t('categoryManager.add')}
          </button>
        </div>
      </div>
    </div>
  );
}
