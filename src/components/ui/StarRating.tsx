import { cn } from '@/lib/utils';

interface StarRatingProps {
  value: number;
  onChange?: (value: number) => void;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
}

const sizeMap = {
  sm: 'text-base',
  md: 'text-xl',
  lg: 'text-2xl',
};

export default function StarRating({ value, onChange, max = 5, size = 'md' }: StarRatingProps) {
  const interactive = !!onChange;

  return (
    <div className="flex">
      {Array.from({ length: max }, (_, i) => (
        <button
          key={i}
          type="button"
          disabled={!interactive}
          onClick={() => onChange?.(i + 1)}
          className={cn(
            'material-icons-outlined transition-colors',
            sizeMap[size],
            i < value
              ? 'text-primary'
              : 'text-gray-300 dark:text-gray-600',
            interactive && 'cursor-pointer hover:text-primary/70',
            !interactive && 'cursor-default',
          )}
        >
          star
        </button>
      ))}
    </div>
  );
}
