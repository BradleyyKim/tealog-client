import { cn } from '@/lib/utils';

interface FilterChipsProps {
  options: { label: string; value: string }[];
  selected: string;
  onChange: (value: string) => void;
  onManage?: () => void;
}

export default function FilterChips({ options, selected, onChange, onManage }: FilterChipsProps) {
  return (
    <div className="flex space-x-3 overflow-x-auto pb-2 no-scrollbar">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={cn(
            'flex-none px-5 py-2 rounded-full text-sm font-medium transition-all',
            selected === opt.value
              ? 'bg-primary text-white font-semibold shadow-sm'
              : 'bg-bg-light dark:bg-bg-dark text-text-muted border border-transparent hover:border-primary/30 hover:text-neutral-dark dark:hover:text-white',
          )}
        >
          {opt.label}
        </button>
      ))}
      {onManage && (
        <button
          onClick={onManage}
          className="flex-none w-9 h-9 rounded-full flex items-center justify-center bg-bg-light dark:bg-bg-dark text-text-muted hover:text-primary hover:border-primary/30 border border-transparent transition-all"
        >
          <span className="material-icons text-lg">tune</span>
        </button>
      )}
    </div>
  );
}
