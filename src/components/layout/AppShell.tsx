import { Outlet, useLocation } from 'react-router-dom';
import BottomNav from './BottomNav';
import FAB from './FAB';

export default function AppShell() {
  const location = useLocation();
  const isProfile = location.pathname === '/profile';

  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark flex flex-col relative">
      <div className="flex-1 pb-20 overflow-y-auto">
        <Outlet />
      </div>
      {!isProfile && <FAB />}
      <BottomNav />
    </div>
  );
}
