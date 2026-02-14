import { useNavigate } from 'react-router-dom';

interface PageHeaderProps {
  title: string;
  showBack?: boolean;
  rightAction?: React.ReactNode;
}

export default function PageHeader({ title, showBack = true, rightAction }: PageHeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-20 bg-bg-light/90 dark:bg-bg-dark/90 backdrop-blur-md border-b border-neutral-light/50 dark:border-neutral-dark/30 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {showBack && (
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-neutral-light/50 dark:hover:bg-neutral-dark/30 transition-colors"
            >
              <span className="material-icons-outlined text-neutral-dark dark:text-white">
                arrow_back
              </span>
            </button>
          )}
          <h1 className="text-xl font-bold text-neutral-dark dark:text-white">{title}</h1>
        </div>
        {rightAction}
      </div>
    </header>
  );
}
