import { useEffect, useState } from 'react'

export default function Index() {
  const [products, setProducts] = useState<any[]>([])

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/products`)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err))
  }, [])

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