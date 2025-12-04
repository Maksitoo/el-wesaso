const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

export async function getProducts(category?: string) {
  const url = category 
    ? `${API_URL}/shop/products?category=${category}`
    : `${API_URL}/shop/products`
  
  const response = await fetch(url, {
    cache: 'no-store'
  })
  
  const data = await response.json()
  return data.success ? data.products : []
}

export async function getProduct(id: string) {
  const response = await fetch(`${API_URL}/shop/products/${id}`, {
    cache: 'no-store'
  })
  
  const data = await response.json()
  return data.success ? data.product : null
}

