import { createContext, useContext, useEffect, useState } from 'react'

interface User {
  id: number
  email: string
  username: string
  avatar?: string
}

interface AuthContextType {
  user: User | null
  isAuth: boolean
  loading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  register: (data: { email: string, password: string, username: string, avatar?: string }) => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const checkAuth = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/account', {
        credentials: 'include'
      })

      if (res.ok) {
        const data = await res.json()
        setUser(data)
      } else {
        setUser(null)
      }
    } catch (e) {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password })
      })

      if (res.ok) {
        await checkAuth()
        return true
      }

      return false
    } catch {
      return false
    }
  }

  const logout = async () => {
    await fetch('http://localhost:5000/api/logout', {
      method: 'POST',
      credentials: 'include'
    })

    setUser(null)
  }

  const register = async (data: { email: string, password: string, username: string, avatar?: string }) => {
    try {
      const res = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data)
      })

      if (res.ok) {
        await checkAuth()
        return true
      }

      return false
    } catch {
      return false
    }
  }

  useEffect(() => {
    checkAuth()
  }, [])

  const value: AuthContextType = {
    user,
    isAuth: !!user,
    loading,
    login,
    logout,
    register
  }

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}
