import React from 'react'
import { useGlobalContext } from '../Context'
import { Link } from 'react-router-dom'
import Product from './Product'
import Loading from './Loading'

export default function ProductList() {
  const { products, loading } = useGlobalContext()

  if(loading) {
    return <Loading />
  }

  if(products.length < 1) {
    return (
      <div className='product-list'>
        <h2>No Items found...</h2>
      </div>          
    )
  }

  return (
    <>
      <div className='product-list'>      
        {products.map((product, index) => {
          return <Link key={index} to={`/products/${product.product_id}`}><Product {...product} /></Link>
        })}        
      </div>
    </>
  )
}