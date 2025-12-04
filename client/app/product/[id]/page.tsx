'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '')

function CheckoutForm({ product, clientSecret }: { product: any, clientSecret: string }) {
  const stripe = useStripe()
  const elements = useElements()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!stripe || !elements) return

    setLoading(true)
    setError('')

    const { error: submitError } = await elements.submit()
    if (submitError) {
      setError(submitError.message || '')
      setLoading(false)
      return
    }

    const { error: confirmError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/profile`,
      },
    })

    if (confirmError) {
      setError(confirmError.message || '')
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 disabled:opacity-50 transition-colors"
      >
        {loading ? 'Procesando...' : `Pagar $${product.price.toFixed(2)}`}
      </button>
    </form>
  )
}

export default function ProductPage() {
  const params = useParams()
  const { user } = useAuth()
  const [product, setProduct] = useState<any>(null)
  const [clientSecret, setClientSecret] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadProduct()
  }, [params.id])

  const loadProduct = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/shop/products/${params.id}`)
      const data = await response.json()
      if (data.success) {
        setProduct(data.product)
      }
    } catch (error) {
      console.error('Error cargando producto:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleBuy = async () => {
    if (!user) {
      alert('Debes iniciar sesión para comprar')
      return
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payments/create-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ productId: product._id })
      })

      const data = await response.json()
      if (data.success) {
        setClientSecret(data.clientSecret)
      }
    } catch (error) {
      console.error('Error creando intent de pago:', error)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <p className="text-center">Cargando producto...</p>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12">
        <p className="text-center">Producto no encontrado</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            {product.image && (
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full rounded-lg shadow-lg"
              />
            )}
          </div>
          
          <div>
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            <p className="text-2xl font-bold text-primary-600 mb-4">
              ${product.price.toFixed(2)}
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {product.description}
            </p>
            <p className="mb-4">
              <strong>Categoría:</strong> {product.category}
            </p>

            {!clientSecret ? (
              <button
                onClick={handleBuy}
                className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors"
              >
                Comprar Ahora
              </button>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-4">Completar Pago</h2>
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                  <CheckoutForm product={product} clientSecret={clientSecret} />
                </Elements>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

