import { useState, useEffect } from 'react'
import './App.css'
import { CATEGORIES_API, PRODUCTS_API } from './utils/constants'

interface Product {
  id: number
  name: string
  description: string
  price: number
}

interface Category {
  id: number
  name: string
  description: string
}

function App() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        // Fetch products
        const productsResponse = await fetch(`${PRODUCTS_API}/api/products`)
        if (!productsResponse.ok) throw new Error('Failed to fetch products')
        const productsData = await productsResponse.json()
        setProducts(productsData)

        // Fetch categories
        const categoriesResponse = await fetch(`${CATEGORIES_API}/api/categories`)
        if (!categoriesResponse.ok) throw new Error('Failed to fetch categories')
        const categoriesData = await categoriesResponse.json()
        setCategories(categoriesData)

        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
        console.error('Error fetching data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [PRODUCTS_API, CATEGORIES_API])

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container">
        <div className="error">Error: {error}</div>
      </div>
    )
  }

  return (
    <div className="container">
      <header className="header">
        <h1>🚀 Deployment Guide Demo</h1>
        <p className="subtitle">Microservices Architecture with Docker</p>
      </header>

      <div className="content">
        <section className="section">
          <div className="section-header">
            <h2>📦 Products</h2>
            <span className="badge">.NET API + PostgreSQL</span>
          </div>
          <div className="grid">
            {products.map((product) => (
              <div key={product.id} className="card">
                <h3>{product.name}</h3>
                <p className="description">{product.description}</p>
                <p className="price">${product.price.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="section-header">
            <h2>🏷️ Categories</h2>
            <span className="badge">Python FastAPI</span>
          </div>
          <div className="grid">
            {categories.map((category) => (
              <div key={category.id} className="card category-card">
                <h3>{category.name}</h3>
                <p className="description">{category.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <footer className="footer">
        <p>Built with ❤️ using Docker, .NET, Python FastAPI, and React</p>
      </footer>
    </div>
  )
}

export default App
