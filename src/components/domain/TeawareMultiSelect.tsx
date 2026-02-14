import { useTeawares } from '@/hooks/useTeaware';
import { useI18n } from '@/contexts/I18nContext';
import { cn, formatDisplayCategory } from '@/lib/utils';

interface TeawareMultiSelectProps {
  value: string[];
  onChange: (documentIds: string[]) => void;
}

export default function TeawareMultiSelect({ value, onChange }: TeawareMultiSelectProps) {
  const { data: teawares, isLoading } = useTeawares();
  const { t } = useI18n();

  if (isLoading) {
    return <p className="text-xs text-text-muted">{t('component.loadingTeaware')}</p>;
  }

  const activeTeawares = teawares?.filter((tw) => tw.status === 'Active') || [];

  const toggle = (docId: string) => {
    if (value.includes(docId)) {
      onChange(value.filter((id) => id !== docId));
    } else {
      onChange([...value, docId]);
    }
  };

  return (
    <div>
      <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">
        {t('component.teawareUsed')}
      </label>
      <div className="flex flex-wrap gap-2">
        {activeTeawares.length === 0 && (
          <p className="text-xs text-text-muted">{t('component.noTeaware')}</p>
        )}
        {activeTeawares.map((tw) => (
          <button
            key={tw.documentId}
            type="button"
            onClick={() => toggle(tw.documentId)}
            className={cn(
              'inline-flex items-center gap-2 px-3 py-2 rounded-xl border text-sm font-medium transition-all',
              value.includes(tw.documentId)
                ? 'bg-primary/10 border-primary text-neutral-dark dark:text-white'
                : 'bg-white dark:bg-neutral-dark/20 border-neutral-light dark:border-neutral-dark/50 text-text-muted hover:border-primary/30',
            )}
          >
            <span className="material-icons-outlined text-base">
              {value.includes(tw.documentId) ? 'check_circle' : 'coffee'}
            </span>
            {tw.name}
            {tw.type && (
              <span className="text-xs opacity-60">({formatDisplayCategory(tw.type)})</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
