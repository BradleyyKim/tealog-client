import { Outlet, useLocation } from 'react-router-dom';
import BottomNav from './BottomNav';
import FAB from './FAB';

const FAB_CONFIG: Record<string, string> = {
  '/teas': '/teas/new',
  '/teaware': '/teaware/new',
};

export default function AppShell() {
  const location = useLocation();
  const fabTo = FAB_CONFIG[location.pathname];

  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark flex flex-col relative">
      <div className="flex-1 pb-20 overflow-y-auto">
        <Outlet />
      </div>
      {fabTo && <FAB to={fabTo} />}
      <BottomNav />
    </div>
  );
}
