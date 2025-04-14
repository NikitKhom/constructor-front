// src/router.tsx
import { createBrowserRouter } from 'react-router-dom'
import MainLayout from './layout/MainLayout/MainLayout'
// import StylesPage from './pages/StylesPage'
// import AccountPage from './pages/AccountPage'
// import LoginPage from './pages/LoginPage'
// import RegisterPage from './pages/RegisterPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    // children: [
    //   { path: '', element: <StylesPage /> },
    //   { path: 'account', element: <AccountPage /> },
    // ],
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
