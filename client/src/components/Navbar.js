import React from 'react';
import { Link } from 'react-router-dom';
import { links } from '../data';
import { FaHome, FaBars, FaShoppingCart, FaSearch } from 'react-icons/fa';
import { useGlobalContext } from '../Context';


const Navbar = () => {
    const { toggleSidebar, toggleSearchbar, totalCartAmount } = useGlobalContext() 

    return (
        <nav className='navbar'>
            <div className='navbar-center'>

                <Link to='/'><FaHome /></Link>

                <button className='navbar-menu-btn' onClick={toggleSidebar} >
                    <FaBars />
                </button>                

                <ul>
                    {links.map((link) => {
                        const { id, url, name } = link;
                        return (
                        <li key={id}>
                            <Link to={url}>{name}</Link>
                        </li>
                        )
                    })}
                </ul>
                
                <Link to='/products'>
                    <div className='navbar-search-btn' onClick={toggleSearchbar}>
                        <FaSearch />
                    </div>
                </Link>

                <div className="navbar-cart-btn">
                    <Link to='/cart'><FaShoppingCart /></Link>
                    <div className={`${totalCartAmount && 'show-navbar-cart-amount'} navbar-cart-amount`}>{totalCartAmount}</div>
                </div>

            </div>
        </nav>
    )
}

export default Navbar