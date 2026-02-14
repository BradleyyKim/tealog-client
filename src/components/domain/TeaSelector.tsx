import { useTeaLeaves } from '@/hooks/useTeaLeaves';
import { useI18n } from '@/contexts/I18nContext';

interface TeaSelectorProps {
  value: string | undefined;
  onChange: (documentId: string) => void;
}

export default function TeaSelector({ value, onChange }: TeaSelectorProps) {
  const { data: teas, isLoading } = useTeaLeaves();
  const { t } = useI18n();

  return (
    <div>
      <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">
        {t('component.teaLeaf')}
      </label>
      <select
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        disabled={isLoading}
        className="w-full px-4 py-3 rounded-xl bg-bg-light dark:bg-bg-dark text-sm text-neutral-dark dark:text-white border-none focus:ring-2 focus:ring-primary/50 outline-none appearance-none"
      >
        <option value="">{t('component.selectTea')}</option>
        {teas?.map((tea) => (
          <option key={tea.documentId} value={tea.documentId}>
            {tea.name} {tea.category ? `(${tea.category})` : ''}
          </option>
        ))}
      </select>
    </div>
  );
}
