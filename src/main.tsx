import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { queryClient } from '@/lib/query-client';
import { AuthProvider } from '@/contexts/AuthContext';
import { I18nProvider } from '@/contexts/I18nContext';
import { migrateStorage } from '@/lib/migrate-storage';
import SplashScreen from '@/components/SplashScreen';
import App from './App';
import './index.css';

migrateStorage();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
      <AuthProvider>
        <SplashScreen>
          <App />
        </SplashScreen>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              borderRadius: '12px',
              background: '#3d3028',
              color: '#fff',
              fontSize: '14px',
            },
          }}
        />
      </AuthProvider>
      </I18nProvider>
    </QueryClientProvider>
  </StrictMode>,
);
