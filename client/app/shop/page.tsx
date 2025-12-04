'use client'

import { useState, useEffect } from 'react'
import ProductCard from '@/components/ProductCard'
import { getProducts } from '@/lib/api'

export default function ShopPage() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadProducts()
    loadCategories()
  }, [selectedCategory])

  const loadProducts = async () => {
    try {
      setLoading(true)
      const data = await getProducts(selectedCategory || undefined)
      setProducts(data)
    } catch (error) {
      console.error('Error cargando productos:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadCategories = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/shop/categories`)
      const data = await response.json()
      if (data.success) {
        setCategories(data.categories)
      }
    } catch (error) {
      console.error('Error cargando categorías:', error)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Tienda</h1>

      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory('')}
          className={`px-4 py-2 rounded-lg ${
            selectedCategory === ''
              ? 'bg-primary-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700'
          }`}
        >
          Todos
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg capitalize ${
              selectedCategory === category
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-xl">Cargando productos...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product: any) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}

      {!loading && products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500">No hay productos disponibles</p>
        </div>
      )}
    </div>
  )
}

