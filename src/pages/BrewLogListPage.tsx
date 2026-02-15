import { useBrewLogs } from '@/hooks/useBrewLogs';
import { useI18n } from '@/contexts/I18nContext';
import PageHeader from '@/components/layout/PageHeader';
import BrewLogListItem from '@/components/domain/BrewLogListItem';
import EmptyState from '@/components/ui/EmptyState';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function BrewLogListPage() {
  const { t } = useI18n();
  const { data: brewLogs, isLoading } = useBrewLogs();

  if (isLoading) return <LoadingSpinner />;

  const logs = brewLogs || [];

  return (
    <div>
      <PageHeader title={t('brewList.title')} />
      <div className="px-6 py-4">
        {logs.length === 0 ? (
          <EmptyState icon="local_cafe" message={t('brewList.empty')} />
        ) : (
          <div className="space-y-3">
            {logs.map((log) => (
              <BrewLogListItem key={log.documentId} log={log} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
