import { cn } from '@/lib/utils';
import { formatDisplayCategory } from '@/lib/utils';

const colorMap: Record<string, string> = {
  Green: 'bg-emerald-100/80 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
  White: 'bg-stone-200/80 text-stone-700 dark:bg-stone-700/40 dark:text-stone-300',
  Oolong: 'bg-amber-100/80 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
  Black: 'bg-stone-800/10 text-stone-800 dark:bg-stone-300/10 dark:text-stone-300',
  Sheng_Puerh: 'bg-yellow-100/80 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
  Shou_Puerh: 'bg-orange-100/80 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
  Herbal: 'bg-rose-100/80 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300',
};

export default function CategoryBadge({ category }: { category: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-bold',
        colorMap[category] || 'bg-stone-100 text-stone-600',
      )}
    >
      {formatDisplayCategory(category)}
    </span>
  );
}
