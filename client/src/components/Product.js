import React from 'react';

export default function Product({ product_id, name, category, price, description }) {

    // Shorten description after a certain amount of characters
    const checkDescriptionLenght = () => {
        if(description.length > 100) {
            return true
        }
        return false
    }

    return (
        <div className="product-card">
            <div className="product-card-info">
                <h2>{name}</h2>
                <p>{checkDescriptionLenght() ? description.substring(0, 100)+`...` : description}</p>
                <p>Price: {price}</p>
            </div>
            
            <div className="img-container"></div>
        </div>        
    )
}