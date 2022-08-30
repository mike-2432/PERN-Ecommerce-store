import React, { useContext, useState, useEffect } from 'react';

const AppContext = React.createContext()

// Custom Hook
export function useGlobalContext() {
    return useContext(AppContext)
}


export function AppProvider({children}) {
    // States
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isSearchbarOpen, setIsSearchbarOpen] = useState(false);
    const [isSortboxOpen, setIsSortboxOpen] = useState(false);

    const [loading, setLoading] = useState(true);

    const [products, setProducts] = useState([]);
    const [searchProduct, setSearchProduct] = useState('');
    const [sortMethod, setSortMethod] = useState('');
    const [sortParam, setSortParam] = useState('');

    const [cartItems, setCartItems] = useState([]);
    const [totalCartAmount, setTotalCartAmount] = useState(0);
    const [totalCartValue, setTotalCartValue] = useState(0);    
    
    

    // Functions
    const toggleSidebar = () => {
        if(isSearchbarOpen) {
            setIsSearchbarOpen(false)
        }
        setIsSidebarOpen(!isSidebarOpen)
    }

    const toggleSearchbar = () => {
        if(isSortboxOpen) {
            setIsSortboxOpen(false)
        }
        if(isSidebarOpen) {
            setIsSidebarOpen(false)
        }
        setIsSearchbarOpen(!isSearchbarOpen)
    }

    const toggleSortBox = () => {
        if(isSearchbarOpen) {
            setIsSearchbarOpen(false)
        }
        setIsSortboxOpen(!isSortboxOpen);
    }


    const addToCart = (product) => {        
        if(cartItems.length === 0) {
            // Add the first cart item
            setCartItems([{product: product, amount: 1, totalPrice: product.price}])            
        } else {
            // Check for a duplicate and update that duplicate
            if(cartItems.some((cartItem) => cartItem.product.product_id === product.product_id)) {
                setCartItems(cartItems.map((cartItem) => {
                    if(cartItem.product.product_id === product.product_id) {
                        return {product, 
                            amount: cartItem.amount + 1, 
                            totalPrice: cartItem.totalPrice + product.price}
                    } 
                    return {...cartItem}
                }))            
            } else {
            // Add a new item
                setCartItems([...cartItems, {product: product, amount: 1, totalPrice: product.price}])                
            }           
        }             
        console.log(cartItems)
    }


    const deleteCartItem = (id) => {
        setCartItems(cartItems.filter((cartItem) => cartItem.product.product_id !== id))
    }

    const changeAmountCartItem = (type, id, price, amount) => {
        setCartItems(cartItems.map((cartItem) => {
            if(cartItem.product.product_id === id) {
                if(type === 'increase') {
                    return { ...cartItem, amount: cartItem.amount + 1, totalPrice: cartItem.totalPrice + price }
                }     
                if(type === 'decrease') {
                    if(amount > 0) {
                        return { ...cartItem, amount: cartItem.amount -1, totalPrice: cartItem.totalPrice - price}
                    }              
                }           
            }
            return cartItem
        }))
    }

    const clearCart = () => {
        setCartItems([]);
        setTotalCartValue(0);
    }


    // Database function
    useEffect(() => {
        const fetchProducts = async() => {
            setLoading(true)
            try {      
                let response = '';   
                if(sortMethod) {
                    response = await fetch(`http://localhost:3001/api/v1/products/${sortMethod}/${sortParam}`)
                } else {
                    response = await fetch(`http://localhost:3001/api/v1/products/${searchProduct}`)
                }            
                const data = await response.json()
                if(data) {
                    setProducts(data)   
                } else {
                    setProducts([])
                }            
                setLoading(false)
            } catch (err) {
                console.error(err.message)
            }
        };
        fetchProducts();
    }, [searchProduct, sortMethod, sortParam])


    // Calculate the total cart amount and total cart price
    useEffect(() => {
        const calcTotalAmount = () => {    
            setTotalCartAmount(0)
            setTotalCartValue(0)
            if(cartItems.length > 0) {

                setTotalCartValue(cartItems.reduce((total, item) => {
                    return item.totalPrice + total
                }, 0))                    
                
                setTotalCartAmount(cartItems.reduce((total, item) => {
                    return item.amount + total
                }, 0))
            } 
        }
        calcTotalAmount();
    }, [cartItems])
   

    // Remove sortMethod after search input
    useEffect(() => {
        setSortMethod('');
    }, [searchProduct])

    
    // Return
    return (
        <AppContext.Provider value={{
            isSidebarOpen,
            toggleSidebar,

            isSearchbarOpen,
            toggleSearchbar,

            isSortboxOpen,
            toggleSortBox,

            loading,
            setLoading,

            products,
            searchProduct,
            setSearchProduct,
            setSortMethod,
            setSortParam,

            cartItems,
            setCartItems,
            addToCart,            
            clearCart,
            totalCartAmount,
            totalCartValue,

            deleteCartItem,
            changeAmountCartItem,
        }}>
            {children}
        </AppContext.Provider>
    )
}