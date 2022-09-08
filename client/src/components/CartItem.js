import React from 'react'
import { useGlobalContext } from '../Context'
import { FaCaretLeft, FaCaretRight } from 'react-icons/fa'

const CartItem = ( {product:{product_id, name, price}, amount, totalPrice} ) => {
    const { deleteCartItem, changeAmountCartItem } = useGlobalContext();

    return (
        <div className="cart-item">
            <div>
                <h4>{name}</h4>
                <p>$ {totalPrice}</p>
                <button className='remove-cart-item' onClick={() => deleteCartItem(product_id)}>Delete Item</button>
            </div>
            <div>
                <button onClick={() => changeAmountCartItem('decrease', product_id, price, amount)}><FaCaretLeft /></button>
                <h4>{ amount }</h4>
                <button onClick={() => changeAmountCartItem('increase', product_id, price, amount)}><FaCaretRight /></button>
            </div>            
        </div>
    )
}

export default CartItem