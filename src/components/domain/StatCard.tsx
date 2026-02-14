interface StatCardProps {
  icon: string;
  value: string | number;
  label: string;
  iconBgClass?: string;
  iconTextClass?: string;
}

export default function StatCard({
  icon,
  value,
  label,
  iconBgClass = 'bg-primary/20',
  iconTextClass = 'text-primary-dark dark:text-primary',
}: StatCardProps) {
  return (
    <div className="bg-white dark:bg-neutral-dark/40 p-4 rounded-xl border border-neutral-light dark:border-neutral-dark/50 flex flex-col items-start gap-3">
      <div
        className={`w-10 h-10 rounded-full ${iconBgClass} ${iconTextClass} flex items-center justify-center`}
      >
        <span className="material-icons-outlined text-xl">{icon}</span>
      </div>
      <div>
        <span className="text-2xl font-bold text-neutral-dark dark:text-white block">{value}</span>
        <span className="text-xs text-neutral-mid font-semibold uppercase tracking-wider">
          {label}
        </span>
      </div>
    </div>
  );
}
