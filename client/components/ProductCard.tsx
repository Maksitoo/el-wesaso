'use client'

import Link from 'next/link'

interface ProductCardProps {
  product: {
    _id: string
    name: string
    description: string
    price: number
    category: string
    image?: string
  }
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/product/${product._id}`}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
        {product.image && (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover"
          />
        )}
        <div className="p-6">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold">{product.name}</h3>
            <span className="text-sm bg-primary-100 text-primary-800 px-2 py-1 rounded">
              {product.category}
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
            {product.description}
          </p>
          <p className="text-2xl font-bold text-primary-600">
            ${product.price.toFixed(2)}
          </p>
        </div>
      </div>
    </Link>
  )
}

