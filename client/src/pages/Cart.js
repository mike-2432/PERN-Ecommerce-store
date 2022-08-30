import React, { useEffect } from 'react'
import CartItem from '../components/CartItem'
import { useGlobalContext } from '../Context'

const Cart = () => {

    const { cartItems, clearCart, totalCartValue } = useGlobalContext();

    if(cartItems.length === 0) {
        return (
            <div className="page-container">
                <div className="cart-container">
                    <div className="cart-header">
                        <h1>Your cart is empty</h1>
                        <div className="cart-underline-small"></div>
                    </div>
                </div>
            </div>             
        )
    }

    return (
        <div className="page-container">
            <div className="cart-container">

                <div className="cart-header">
                    <h1>YOUR BAG</h1>
                    <div className="cart-underline-small"></div>
                </div>

                <div>
                    {cartItems.map((cartItem, index) => {
                       return <CartItem key={index} {...cartItem} />
                    })}
                </div>

                <div className="cart-footer">
                    <div className="cart-underline-big"></div>
                    <h4>Total <span>$ {totalCartValue}</span></h4>
                    <button className="clear-cart-btn" onClick={clearCart}>Clear Cart</button>
                </div>

            </div>
        </div>
    )
}

export default Cart