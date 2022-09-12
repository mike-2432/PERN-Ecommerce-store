import React from 'react'

export default function Product({ name, price, description, category }) {

    const checkDescriptionLenght = () => {
        if(description.length > 80) return true
        return false
    }

    return (
        <div className='product-card'>
            <div className='product-card-info'>

                <div>
                    <h2 className='product-card-title'>{name}</h2>
                    <p className='product-card-category'>{category}</p>
                </div>   
                             
                <p className='product-card-desc'>{checkDescriptionLenght() ? description.substring(0, 80)+`...` : description}</p>
                <p className='product-card-price'>Price: $ {price}</p>

            </div>            
            <div className='img-container'></div>
        </div>        
    )
}