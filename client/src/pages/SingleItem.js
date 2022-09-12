import React, { useEffect, useState} from 'react'
import { useParams} from 'react-router-dom'
import { useGlobalContext } from '../Context'
import Loading from '../components/Loading'

const SingleItem = () => {
  const { id } = useParams();
  const { loading, setLoading, addToCart } = useGlobalContext(); 

  const [ singleProduct, setSingleProduct] = useState({});
  const [ inventory, setInventory ] = useState('');
  const [ succesColor, setSuccesColor ] = useState(false);


  // FETCH PRODUCT AND INVENTORY STATUS //
  useEffect(()=> {    
    setLoading(true)
    async function getProduct() {
      try {
        const product_response = await fetch(`/api/v1/product/${id}`);
        const product_data = await product_response.json();
        const inventory_response = await fetch(`/api/v1/inventory/${id}`);
        const inventory_data = await inventory_response.json();
        if(product_data && inventory_data) {
            setSingleProduct(...product_data)
            setInventory(...inventory_data)                    
        } else {
          setSingleProduct({})
          setInventory(null)
        }
        setLoading(false)        

      } catch(err) {
        console.error(err.message)
        setLoading(false)
      }
    }
    getProduct()
  }, [id, setLoading])


  // HANDLE ADD TO CART //
  const handleAddToCart = () => {
    if(addToCart(singleProduct)) {
      setSuccesColor(true)
    }
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSuccesColor(false);
    }, 400);
    return () => clearTimeout(timeout);
  }, [succesColor])
  

  // RETURN //
  if(loading) {
    return (
      <div className='page-container'>
        <Loading />
      </div>
    )
  }

  if(!singleProduct) {
    return (
      <div className='page-container'>
        <h1>No product found...</h1>
      </div>
    )
  }

  const { name, price, description } = singleProduct;
  const { stock } = inventory;
  return (
    <div className='page-container'>
      <div className='product-page'>

        <div className='product-page-img'></div>

        <div className='product-page-info'>
          <h1>{name}</h1>
          <div className='product-page-underline'></div>
          <p className='product-page-price'>$ {price} &nbsp; (
            <span style={stock===0 ? {color:'red'} : {}}>{stock} in stock</span>) </p>
          <p className='product-page-description'>{description}</p>
        </div>

        <div className='product-page-btn-container'>
          <button className={`${succesColor ? 'product-page-cart-btn product-page-succes' : 'product-page-cart-btn'}`} onClick={handleAddToCart}>Add to cart</button>
        </div>       

      </div>
    </div>
  )
}

export default SingleItem