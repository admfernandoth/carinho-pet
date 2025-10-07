import { createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProfessionalsPage from './pages/ProfessionalsPage';
import SignupPage from './pages/SignupPage';
import ProfessionalDetailPage from './pages/ProfessionalDetailPage';

export const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/profissionais', element: <ProfessionalsPage /> },
  { path: '/profissionais/:id', element: <ProfessionalDetailPage /> },
  { path: '/cadastro', element: <SignupPage /> },
]);