import React, { useState } from 'react'
import FormInput from '../components/FormInput'
import { useGlobalContext } from '../Context';


const Checkout = () => {
    const { cartItems, totalCartValue, checkInventoryConflict, setIsSuccesfulOrderOpen, clearCart } = useGlobalContext();

    const [ formValues, setFormValues ] = useState({
        products: cartItems.map((cartItem) => cartItem.product.name + '(' + cartItem.amount + ')').join(),
        total_price: totalCartValue,
        first_name:'test',
        last_name:'test',
        dob:'',
        phone_number:'1234567',
        address:'test',
        city:'test',
        email:'e@e.nl',
        confirmemail:'e@e.nl',
    });

    const formInputs = [
        {
            id: 1,
            name:'first_name',
            type: 'text',
            placeholder: 'First name',
            label:'First name',
            pattern: '^[A-Za-z_ ]{3,40}$',
            errorMsg: 'Please fill in your first name',
            required: true,     
        },
                {
            id: 2,
            name:'last_name',
            type: 'text',
            placeholder: 'Last name',
            label:'Last name',
            pattern: '^[A-Za-z_ ]{3,40}$',
            errorMsg: 'Please fill in your last name',   
            required: true,          
        },
                {
            id: 3,
            name:'dob',
            type: 'date',
            placeholder: 'Date of Birth',
            label:'Date of Birth',
            required: true,
        },
        {
            id: 4,
            name:'phone_number',
            type: 'text',
            placeholder: 'Phone number',
            label:'Phone number',
            pattern: `^[0-9]{7,18}$`,
            errorMsg: 'Please fill in a valid phone number without spaces',
            required: true,        
        },
        {
            id: 5,
            name:'address',
            type: 'text',
            placeholder: 'Address',
            label:'Address',
            pattern: '^[A-Za-z0-9_ ]{3,40}$',
            errorMsg: 'Please fill in a valid address',
            required: true,
        },
        {
            id: 6,
            name:'city',
            type: 'text',
            placeholder: 'City',
            label:'City',
            pattern: '^[A-Za-z_ ]{3,40}$',
            errorMsg: 'Please enter a city',
            required: true,  
        },
                {
            id: 7,
            name:'email',
            type: 'email',
            placeholder: 'Email',
            label:'Email',
            errorMsg: 'Please fill in a valid email',
            required: true,     
        },
        {
            id: 8,
            name:'confirmemail',
            type: 'email',
            placeholder: 'Confirm Email',
            label:'Confirm Email',
            pattern: formValues.email,
            errorMsg: 'Email does not match',
            required: true,       
        },
    ]


    // ORDER REQUEST //
    const handleSubmit = async(e) => {
        e.preventDefault()
        
        // Get the amount of items per product id
        const product_idArr = await cartItems.map((cartItem) => cartItem.product.product_id);
        const amountArr = await cartItems.map((cartItem) => cartItem.amount);
       
        try {
            // Substract the items from the inventory
            const response = await fetch(`http://localhost:3001/api/v1/inventory`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                mode: 'cors',
                body: JSON.stringify({products:product_idArr, amount: amountArr})
            })

            // The server checks again if the substraction is possible
            // If it is not possible, the conflict message will appear
            if(!response.ok) {
                if(product_idArr.length < 2) {
                    checkInventoryConflict(product_idArr[0]) 
                } else {
                    product_idArr.forEach((product_id) => checkInventoryConflict(product_id))    
                }
                return
            }
            
            // Send the data to the database
            await fetch(`http://localhost:3001/api/v1/submit`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                mode: 'cors',
                body: JSON.stringify({formValues})
            });         
            clearCart();
            setIsSuccesfulOrderOpen(true);

        } catch(err) {
            console.error(err.message);
        }
    }


    // UPDATE FORM VALUES //
    const handleChange = (e) => {
        setFormValues({...formValues, [e.target.name]: e.target.value})
    };

    
    // RETURN //
    if(cartItems.length === 0) {
        return (
            <div className='page-container'>
                <div className='form-container'>
                    <div className='form-header'>
                        <h1>ORDER FORM</h1>
                        <div className='cart-underline-small'></div>
                        <h4>Your cart is empty</h4>
                    </div>
                </div>
            </div>             
        )
    }

    return (
        <div className='page-container'>
            <div className="form-container">
                
                <div className='form-header'>
                    <h1>ORDER FORM</h1>
                    <div className='cart-underline-small'></div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className='order-form'>
                        {formInputs.map((formInput) => {
                            return <FormInput 
                                key={formInput.id} 
                                {...formInput} 
                                value={formValues[formInput.name]} 
                                handleChange={handleChange} 
                            />
                        })} 
                    </div>
                    <div className="form-btn-container">
                        <button className='form-submit-btn'>Submit</button> 
                    </div>                             
                </form>                                      

            </div>            
        </div>
    )
}

export default Checkout