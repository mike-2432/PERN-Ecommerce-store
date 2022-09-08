import React from 'react'
import { Link } from 'react-router-dom'
import { links } from '../data'
import { FaTimes } from 'react-icons/fa'
import { useGlobalContext } from '../Context'


const Sidebar = () => {
    const { isSidebarOpen, toggleSidebar} = useGlobalContext()

    return (
        <div className={`${isSidebarOpen ? 'sidebar show-sidebar': 'sidebar'}`}>
            <button className='close-sidebar-btn' onClick={toggleSidebar}>
                <FaTimes />
            </button>

            <ul className='sidebar-links'>
                {links.map((link) => {
                    const { id, url, name} = link;
                    return (
                        <li key={id} onClick={toggleSidebar}>
                            <Link to={url}><div>{name}</div></Link>
                        </li>
                    )
                })}
            </ul>
        </div>      
    )
}

export default Sidebar