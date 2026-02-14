import { motion } from 'framer-motion';
import { emptyBounce } from '@/lib/animations';

interface EmptyStateProps {
  icon?: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function EmptyState({ icon = 'eco', message, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 opacity-60">
      <motion.span
        className="material-icons text-4xl mb-3 text-text-muted"
        variants={emptyBounce}
        initial="initial"
        animate="animate"
      >
        {icon}
      </motion.span>
      <p className="text-sm font-medium text-text-muted mb-4">{message}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="bg-primary text-white px-5 py-2 rounded-lg font-bold text-sm hover:bg-primary-dark transition-colors"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
