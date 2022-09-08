import React from 'react'
import Footer from '../components/Footer'
import { info } from '../data'

const Home = () => {
  return (
    <>
      <div className='homepage-first-section'> 
      <div className="homepage-background-line"></div>       
        <div className='homepage-container'>        
          <h1>About the Project</h1>
          <div className='homepage-text-area'>
            {info.map(paragraph => paragraph)}                  
          </div>      
        </div>        
      </div>

      <Footer />      
    </>
  )
}

export default Home