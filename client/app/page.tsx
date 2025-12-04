import Link from 'next/link'
import ProductCard from '@/components/ProductCard'
import { getProducts } from '@/lib/api'

export default async function Home() {
  const products = await getProducts()

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
          Bienvenido a ValhallaMC
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          Descubre increíbles productos y mejora tu experiencia de juego
        </p>
        <Link 
          href="/shop" 
          className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition-colors"
        >
          Explorar Tienda
        </Link>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6">Productos Destacados</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.slice(0, 6).map((product: any) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>
    </div>
  )
}

