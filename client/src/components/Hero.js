import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import { useGlobalContext } from '../Context';

const Hero = () => {

    const { setSearchProduct} = useGlobalContext();
    const location = useLocation();
    
    const isHomePage = () => {
        if(location.pathname === '/') {
            return true;
        }
        return false;
    }

    useEffect(()=> {
        isHomePage();           
        setSearchProduct('');   // Reset products after page change
    }, [location])
    
    return (
        <>
            <div className={`${isHomePage() ? 'hero' : 'hero hide-hero'}`}>                     
            </div>

            <div className={`${isHomePage() ? 'hero-container' : 'hide-hero-container'}`}>                
                <h1 className='hero-title'>An E-commerce</h1>
                <h1 className='hero-title'>Project</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis voluptate ab illo, explicabo harum eum consequatur atque corrupti vel? Dolorum dicta consequatur ea tenetur doloribus rerum, sed optio asperiores rem?</p>
            </div>  
        </> 
    )
}

export default Hero
