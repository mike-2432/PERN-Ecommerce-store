import React, { useEffect, useState} from 'react'
import { useParams} from 'react-router-dom'
import { useGlobalContext } from '../Context';
import Loading from '../components/Loading';

const SingleItem = () => {

  const { id } = useParams();
  const { loading, setLoading, addToCart } = useGlobalContext(); 
  const [ singleProduct, setSingleProduct] = useState({});

  // Get the product
  useEffect(()=> {    
    setLoading(true)
    async function getProduct() {
      try {
        const response = await fetch(`http://localhost:3001/api/v1/product/${id}`);
        const data = await response.json()
        if(data) {
          setSingleProduct(...data)
        } else {
          setSingleProduct({})
        }
        setLoading(false)
      } catch(err) {
        console.error(err.message)
        setLoading(false)
      }
    }
    getProduct()
  }, [id])


  if(loading) {
    return <Loading />
  }

  if(!singleProduct) {
    return (
      <div className="page-container">
        <h1>No product found...</h1>
      </div>
    )
  }

  const { name, price, description } = singleProduct;
  return (
    <div className="page-container">
      <div className="product-page">

        <div className="product-page-img"></div>

        <div className="product-page-info">
          <h1>{name}</h1>
          <div className="product-page-underline"></div>
          <p className="product-page-price">$ {price}</p>
          <p className="product-page-description">{description}</p>
        </div>

        <div className="product-page-btn-container">
          <button className="product-page-cart-btn" onClick={() => addToCart(singleProduct)}>Add to cart</button>
        </div>
        

      </div>
    </div>
  )
}

export default SingleItem