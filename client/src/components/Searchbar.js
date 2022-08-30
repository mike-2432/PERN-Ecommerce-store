import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { useGlobalContext } from '../Context';

export default function Searchbar() {

    const { isSearchbarOpen, toggleSearchbar, setSearchProduct, setSortMethod} = useGlobalContext();
    
    const handleSearch = (e) => {
        e.preventDefault();  
        setSortMethod('');    
        toggleSearchbar();
    } 

    return (
        
        <div className={`${isSearchbarOpen ? 'searchbar show-searchbar': 'searchbar'}`}>
            <button className='close-searchbar-btn' onClick={toggleSearchbar}>
                <FaTimes />
            </button>

            <form onSubmit={handleSearch}>
                <label htmlFor="Search"></label>
                <input type="text" placeholder='Search for a product' onChange={(e) => setSearchProduct(e.target.value)} />
            </form>
        </div>
        
    )
}