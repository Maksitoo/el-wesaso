'use client'

import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
    router.push('/')
  }

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-2xl font-bold text-primary-600">
            ValhallaMC
          </Link>

          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-primary-600 transition-colors">
              Inicio
            </Link>
            <Link href="/shop" className="hover:text-primary-600 transition-colors">
              Tienda
            </Link>

            {user ? (
              <>
                <Link href="/profile" className="hover:text-primary-600 transition-colors">
                  Perfil
                </Link>
                {user.role === 'admin' && (
                  <Link href="/admin" className="hover:text-primary-600 transition-colors">
                    Admin
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="hover:text-primary-600 transition-colors">
                  Iniciar Sesión
                </Link>
                <Link
                  href="/register"
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Registrarse
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

