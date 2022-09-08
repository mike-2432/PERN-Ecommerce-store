import React from 'react'
import { Link } from 'react-router-dom'
import { links } from '../data'
import { FaHome, FaBars, FaShoppingCart, FaSearch } from 'react-icons/fa'
import { useGlobalContext } from '../Context'


const Navbar = () => {
    const { toggleSidebar, toggleSearchbar, totalCartAmount } = useGlobalContext() 

    return (
        <nav className='navbar'>
            <div className='navbar-center'>

                {/* Home Button */}
                <div><Link to='/'>
                    <button className='navbar-home-btn'><FaHome /></button>
                </Link></div>

                {/* Menu Button */}
                <button className='navbar-menu-btn' onClick={toggleSidebar} >
                    <FaBars />
                </button>                

                {/* Nav Links */}
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
                
                {/* Search Button */}
                <div><Link to='/products'>
                    <button className='navbar-search-btn' onClick={toggleSearchbar}><FaSearch /></button>
                </Link></div>

                {/* Cart Button */}
                <div className='navbar-cart'><Link to='/cart'>
                    <button className='navbar-cart-btn'>
                        <FaShoppingCart />
                        <div className={`${totalCartAmount && 'show-navbar-cart-amount'} navbar-cart-amount`}>{totalCartAmount}</div>
                    </button>
                </Link></div>

            </div>
        </nav>
    )
}

export default Navbar