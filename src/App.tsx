import { RouterProvider } from 'react-router-dom'
import { router } from './routes/router'
import { AuthProvider } from './context/AuthContext'
import { StyleProvider } from './context/StyleContext'

export default function App() {
  
  return (
    <AuthProvider>
      <StyleProvider>
        <RouterProvider router={router} />
      </StyleProvider>
    </AuthProvider> 
  )
  
  
}