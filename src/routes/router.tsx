// src/router.tsx
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layout/MainLayout/MainLayout';
import HomePage from '../pages/HomePage/HomePage';
import StylePage from '../pages/StylePage/StylePage';
import StructurePage from '../pages/StructurePage/StructurePage';
import AccountPage from '../pages/AccountPage/AccountPage';
import StoragePage from '../pages/StoragePage/StoragePage';
import NotFoundPage from '../pages/NotFoundPage/NotFountPage';
import LoginPage from '../pages/LoginPage/LoginPage';
import RegisterPage from '../pages/RegisterPage/RegisterPage';
import { Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to='/welcome' replace/>
  },
  {
    path: '/welcome',
    element: <HomePage />
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/main',
    element: <ProtectedRoute />,
    children: [{
      element: <MainLayout />,
      children: [
        { path: 'styles', element: <StylePage /> },
        { path: 'styles/:id', element: <StylePage /> },
        { path: 'structure', element: <StructurePage /> },
        { path: 'account', element: <AccountPage /> },
        { path: 'storage', element: <StoragePage /> },
      ]
    }]
  },
  {
    path: '*',
    element: <NotFoundPage />
  },
]);