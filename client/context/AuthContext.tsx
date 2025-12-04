'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'

interface User {
  id: string
  username: string
  email: string
  minecraftUsername?: string
  role: string
  balance: number
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (username: string, email: string, password: string, minecraftUsername?: string) => Promise<void>
  logout: () => Promise<void>
  updateUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const token = Cookies.get('token')
      if (token) {
        const response = await api.get('/auth/me')
        if (response.data.success) {
          setUser(response.data.user)
        }
      }
    } catch (error) {
      console.error('Error verificando autenticación:', error)
      Cookies.remove('token')
    } finally {
      setLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password })
    if (response.data.success) {
      Cookies.set('token', response.data.token, { expires: 7 })
      setUser(response.data.user)
    } else {
      throw new Error(response.data.message || 'Error al iniciar sesión')
    }
  }

  const register = async (username: string, email: string, password: string, minecraftUsername?: string) => {
    const response = await api.post('/auth/register', {
      username,
      email,
      password,
      minecraftUsername
    })
    if (response.data.success) {
      Cookies.set('token', response.data.token, { expires: 7 })
      setUser(response.data.user)
    } else {
      throw new Error(response.data.message || 'Error al registrar usuario')
    }
  }

  const logout = async () => {
    try {
      await api.post('/auth/logout')
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    } finally {
      Cookies.remove('token')
      setUser(null)
    }
  }

  const updateUser = async () => {
    try {
      const response = await api.get('/auth/me')
      if (response.data.success) {
        setUser(response.data.user)
      }
    } catch (error) {
      console.error('Error actualizando usuario:', error)
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

