// src/router.tsx
import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../layout/MainLayout/MainLayout'
import HomePage from '../pages/HomePage/HomePage'
import StylePage from '../pages/StylePage/StylePage'
import StructurePage from '../pages/StructurePage/StructurePage'
import AccountPage from '../pages/AccountPage/AccountPage'
import StorePage from '../pages/StoragePage/StoragePage'
import NotFoundPage from '../pages/NotFoundPage/NotFountPage'
import LoginPage from '../pages/LoginPage/LoginPage'
import RegisterPage from '../pages/RegisterPage/RegisterPage'

export const router = createBrowserRouter([
  {
    path: '/welcome',
    element: <HomePage />
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'styles', element: <StylePage /> },
      { path: 'structure', element: <StructurePage /> },
      { path: 'account', element: <AccountPage /> },
      { path: 'storage', element: <StorePage /> },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
])
