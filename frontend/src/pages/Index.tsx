import { useEffect, useState } from 'react'

export default function Index() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  function loadProducts() {
  setLoading(true)
  setError(false)

  fetch(`${import.meta.env.VITE_API_URL}/products`)
    .then(res => res.json())
    .then(data => {
      setProducts(data)
      setLoading(false)
    })
    .catch(err => {
      console.error(err)
      setError(true)
      setProducts([])
      setLoading(false)
    })
}

  useEffect(() => {
    loadProducts()
  }, [])

  if (loading) {
  return <p>Carregando...</p>
} 

if (error) {
  return (
    <div>
      <p>Erro ao carregar produtos</p>
      <button onClick={loadProducts}>Tentar novamente</button>
    </div>
  )
} 

if (error) {
  return (
    <div>
      <p>Erro ao carregar produtos</p>
      <button onClick={loadProducts}>Tentar novamente</button>
    </div>
  )
}

  return (
    <div>
      <h1>Produtos:</h1>

      <ul>
        {products.map((p: any) => {
          return (
            <li key={p.id}>
              {p.name} - {p.price}
            </li>
          )
        })}
      </ul>
    </div>
  )
}