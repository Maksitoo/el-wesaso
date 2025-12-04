'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'

export default function ProfilePage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const [purchases, setPurchases] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login')
    }
  }, [user, authLoading, router])

  useEffect(() => {
    if (user) {
      loadPurchases()
    }
  }, [user])

  const loadPurchases = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payments/purchases`, {
        credentials: 'include'
      })
      const data = await response.json()
      if (data.success) {
        setPurchases(data.purchases)
      }
    } catch (error) {
      console.error('Error cargando compras:', error)
    } finally {
      setLoading(false)
    }
  }

  if (authLoading || loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <p className="text-center">Cargando...</p>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Mi Perfil</h1>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Información de Usuario</h2>
        <div className="space-y-2">
          <p><strong>Usuario:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Usuario de Minecraft:</strong> {user.minecraftUsername || 'No especificado'}</p>
          <p><strong>Balance:</strong> ${user.balance?.toFixed(2) || '0.00'}</p>
          <p><strong>Rol:</strong> {user.role}</p>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Mis Compras</h2>
        {purchases.length === 0 ? (
          <p className="text-gray-500">No has realizado compras aún</p>
        ) : (
          <div className="space-y-4">
            {purchases.map((purchase: any) => (
              <div key={purchase._id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold">{purchase.product?.name || 'Producto eliminado'}</h3>
                    <p className="text-sm text-gray-500">{purchase.product?.description}</p>
                    <p className="text-sm mt-2">
                      Estado: <span className={`font-semibold ${
                        purchase.status === 'completed' ? 'text-green-600' : 
                        purchase.status === 'pending' ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {purchase.status}
                      </span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">${purchase.amount.toFixed(2)}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(purchase.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

