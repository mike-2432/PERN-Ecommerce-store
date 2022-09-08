import React from 'react'
import ProductList from '../components/ProductList'
import { useGlobalContext } from '../Context'

const Products = () => {
  const { setSortMethod, setSortParam, isSortboxOpen, toggleSortBox, setProducts, setSearchProduct, products } = useGlobalContext();
 

  // SORT FUNCTION //
  const handleSort = (e) => {    
    // Sort by category
    if(e.target.parentNode.className === 'category' && e.target.innerHTML !== 'Category') {  
      if(e.target.innerHTML === 'All') {
        setSortMethod('');
        setSortParam('');
        setSearchProduct('');
      } else {
        setSortMethod('category')
        setSortParam(e.target.innerHTML);        
      }      
    }
    // Sort by name or price
    if(e.target.parentNode.className === 'sortby' && e.target.innerHTML !== 'Sort') {
      if(e.target.innerHTML === 'price') {
          setProducts([...products.sort((a, b) => {
          return a.price - b.price;
        })])
      } 
      if(e.target.innerHTML === 'name') {
        setProducts([...products.sort((a, b) => {
          return a.name.localeCompare(b.name);
        })])
      }
    }
  }

  // RETURN //
  return (
    <>
      <div className='page-container'>
  
        <div className='products-page-header'>
          <h1>Products</h1>
          <button className='products-page-sort-btn' onClick={toggleSortBox}>Sort By</button>
        </div>

        <div className='products-page-underline'></div>

        <div onClick={handleSort} className={`${isSortboxOpen ? 'sortbox show-sortbox' : 'sortbox'}`}>
                  
          <div className='category'>
            <h4>Category</h4>
            <p>All</p>
            <p>Desktop</p>
            <p>Laptop</p>
          </div>     

          <div className='sortby'>
            <h4>Sort</h4>
            <p>name</p>
            <p>price</p>
          </div>       
          
        </div>     
        
        <ProductList />        
      </div>  

    </>
  )
}

export default Products
