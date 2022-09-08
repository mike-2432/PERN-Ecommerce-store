import React from 'react'
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../Context'


const SuccesfulOrder = () => {
    const { isSuccesfulOrderOpen, toggleSuccesfulOrderbox } = useGlobalContext()
    
    return (
        <div className={`${isSuccesfulOrderOpen ? 'orderbox show-orderbox': 'orderbox'}`}>
            <h1>Order Succesful!</h1>
            <div className='underline-small'></div>
            <p>Thank you for your purchase :)</p>
            <Link to='/'><button className='takemeback-btn' onClick={toggleSuccesfulOrderbox}>Take me back</button></Link>            
        </div>      
    )
}

export default SuccesfulOrder