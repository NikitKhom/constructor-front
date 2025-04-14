// src/router.tsx
import { createBrowserRouter } from 'react-router-dom'
import MainLayout from './layout/MainLayout/MainLayout'
import HomePage from './pages/HomePage/HomePage'
import StylePage from './pages/StylePage/StylePage'
// import AccountPage from './pages/AccountPage'
// import LoginPage from './pages/LoginPage'
// import RegisterPage from './pages/RegisterPage'

export const router = createBrowserRouter([
  {
    path: '/welcome',
    element: <HomePage />
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/styles', element: <StylePage /> },
      // { path: 'account', element: <AccountPage /> },
    ],
  },
//   {
    // path: '/login',
    // element: <LoginPage />, // без Layout
//   },
//   {
    // path: '/register',
    // element: <RegisterPage />,
//   },
])
