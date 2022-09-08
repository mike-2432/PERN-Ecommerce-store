import React from 'react'
import { FaTimes } from 'react-icons/fa'
import { useGlobalContext } from '../Context'

export default function Searchbar() {
    const { isSearchbarOpen, toggleSearchbar, searchProduct, setSearchProduct, setSortMethod, currentLocation } = useGlobalContext();
    
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setSortMethod(''); // Remove possible sort method
        setSearchProduct(e.target[0].value); 
        toggleSearchbar();       
    } 

    return (        
        <div className={`${isSearchbarOpen && currentLocation==='/products' ? 'searchbar show-searchbar': 'searchbar'}`}>
            <button className='close-searchbar-btn' onClick={toggleSearchbar}>
                <FaTimes />
            </button>

            <form onSubmit={handleSearchSubmit}>
                <label htmlFor='Search'></label>
                <input type='text' value={searchProduct} placeholder='Search for a product' onChange={(e) => setSearchProduct(e.target.value)} />
            </form>
        </div>        
    )
}