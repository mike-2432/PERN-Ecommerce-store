import React from 'react'
import { useGlobalContext } from '../Context'

const Hero = () => {
    const { currentLocation } = useGlobalContext();
   
    return (
        <>
            <div className={`${currentLocation === '/' ? 'hero' : 'hero hide-hero'}`}>                     
            </div>

            <div className={`${currentLocation === '/' ? 'hero-container' : 'hide-hero-container'}`}>                
                <h1 className='hero-title'>An E-commerce</h1>
                <h1 className='hero-title'>Project</h1>
                <p>This Web Application is solely made to test my full stack development skills. The goal was the create a fully functional E-commerce application without relying too heavily on third party code / dependencies.</p>
            </div>  
        </> 
    )
}

export default Hero
