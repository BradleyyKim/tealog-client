import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedLayout from '@/components/layout/ProtectedLayout';
import AppShell from '@/components/layout/AppShell';
import LoginPage from '@/pages/LoginPage';
import HomePage from '@/pages/HomePage';
import TeaCollectionPage from '@/pages/TeaCollectionPage';
import TeaFormPage from '@/pages/TeaFormPage';
import TeawareListPage from '@/pages/TeawareListPage';
import TeawareFormPage from '@/pages/TeawareFormPage';
import BrewLogFormPage from '@/pages/BrewLogFormPage';
import BrewLogDetailPage from '@/pages/BrewLogDetailPage';
import BrewLogListPage from '@/pages/BrewLogListPage';
import ProfilePage from '@/pages/ProfilePage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedLayout />}>
          <Route element={<AppShell />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/brew" element={<BrewLogListPage />} />
            <Route path="/teas" element={<TeaCollectionPage />} />
            <Route path="/teaware" element={<TeawareListPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
          <Route path="/teas/new" element={<TeaFormPage />} />
          <Route path="/teas/:id/edit" element={<TeaFormPage />} />
          <Route path="/teaware/new" element={<TeawareFormPage />} />
          <Route path="/teaware/:id/edit" element={<TeawareFormPage />} />
          <Route path="/brew/new" element={<BrewLogFormPage />} />
          <Route path="/brew/:id" element={<BrewLogDetailPage />} />
          <Route path="/brew/:id/edit" element={<BrewLogFormPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
