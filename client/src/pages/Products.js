import React from 'react';
import ProductList from '../components/ProductList';
import { useGlobalContext } from '../Context';
import Footer from '../components/Footer'

const Products = () => {

  const { setSortMethod, setSortParam, isSortboxOpen, toggleSortBox } = useGlobalContext();
 

  const handleSort = (e) => {    
    if(e.target.parentNode.className === 'category') {
      setSortMethod('category')
      setSortParam(e.target.innerHTML)   
    }     
  }


  return (
    <>
      <div className="page-container">

        <div className="products-page-header">
          <h1>Products</h1>
          <button className='products-page-sort-btn' onClick={toggleSortBox}>Sort By</button>
        </div>

        <div className="products-page-underline"></div>

        <div onClick={handleSort} className={`${isSortboxOpen ? 'sortbox show-sortbox' : 'sortbox'}`}>
                  
          <div className="category">
            <h4>Category</h4>  
            <p>Beauty</p>
            <p>Tech</p>
          </div>     

          <div className="sortby">
            <h4>Sort</h4>
            <p>Name</p>
            <p>Price</p>
          </div>       
          
        </div>     
        
        <ProductList />
        
      </div>  

      <Footer/>
    </>
  )
}

export default Products
