import React, { useContext, useState, useEffect } from 'react'
import useLocalStorage from './useLocalStorage'
import { useLocation } from 'react-router-dom'

const AppContext = React.createContext()

// CUSTOM HOOK //
export function useGlobalContext() {
    return useContext(AppContext)
}

// APP PROVIDER //
export function AppProvider({children}) {

    // STATES //
    const [currentLocation, setCurrentLocation] = useState('');

    const [loading, setLoading] = useState(true);

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isSearchbarOpen, setIsSearchbarOpen] = useState(false);
    const [isSortboxOpen, setIsSortboxOpen] = useState(false);    
    const [isSuccesfulOrderOpen, setIsSuccesfulOrderOpen] = useState(false);
    const [isConflictboxOpen, setIsConflictboxOpen] = useState({state: false, item: null, amountLeft: null});

    const [products, setProducts] = useState([]);
    const [searchProduct, setSearchProduct] = useState('');
    const [sortMethod, setSortMethod] = useState('');
    const [sortParam, setSortParam] = useState('');
    
    const [cartItems, setCartItems] = useLocalStorage('cart', []);
    const [totalCartAmount, setTotalCartAmount] = useLocalStorage('totalAmount', 0);
    const [totalCartValue, setTotalCartValue] = useLocalStorage('totalValue', 0);   

    const [inventory, setInventory] = useState([]);


    // TOGGLE FUNCTIONS //
    const toggleSidebar = () => {
        if(isSortboxOpen) setIsSortboxOpen(false);
        if(isSearchbarOpen) setIsSearchbarOpen(false);     
        setIsSidebarOpen(!isSidebarOpen);
    }

    const toggleSearchbar = () => {
        if(isSortboxOpen) setIsSortboxOpen(false);
        if(isSidebarOpen) setIsSidebarOpen(false);
        setIsSearchbarOpen(!isSearchbarOpen);
    }

    const toggleSortBox = () => {
        if(isSearchbarOpen) setIsSearchbarOpen(false);
        if(isSidebarOpen) setIsSidebarOpen(false);
        setIsSortboxOpen(!isSortboxOpen);
    }

    const toggleConflictbox = () => {
        setIsConflictboxOpen({state: false, item: null, amountLeft: null});
    }

    const toggleSuccesfulOrderbox = () => {
        if(isSearchbarOpen) setIsSearchbarOpen(false);
        if(isSidebarOpen) setIsSidebarOpen(false);
        setIsSuccesfulOrderOpen(false);
    }


    // CART FUNCTIONS //
    const addToCart = (product) => { 
        // Check for inventory conflict       
        if(checkInventoryConflict(product.product_id)) {
            return false
        }
        // Add the first cart item
        if(cartItems.length === 0) {            
            setCartItems([{product: product, amount: 1, totalPrice: parseFloat(product.price)}])   
        // Check for a duplicates and update that duplicate or insert a new item         
        } else {            
            if(cartItems.some((cartItem) => cartItem.product.product_id === product.product_id)) {
                setCartItems(cartItems.map((cartItem) => {
                    if(cartItem.product.product_id === product.product_id) {
                        return {product, 
                            amount: cartItem.amount + 1, 
                            totalPrice: (parseFloat(cartItem.totalPrice) + parseFloat(product.price)).toFixed(2)}
                    } 
                    return {...cartItem}
                }))    
            // Insert a new item        
            } else {  
                setCartItems([...cartItems, {product: product, amount: 1, totalPrice: parseFloat(product.price)}])                
            }           
        }   
        return true
    }


    const deleteCartItem = (id) => {
        setCartItems(cartItems.filter((cartItem) => cartItem.product.product_id !== id))
    }


    const changeAmountCartItem = (type, id, price, amount) => {
        // Update cart
        setCartItems(cartItems.map((cartItem) => {
            if(cartItem.product.product_id === id) {
                // Increase
                if(type === 'increase') {
                    if(checkInventoryConflict(id)) {
                        return { ...cartItem }
                    }
                    return { ...cartItem, amount: cartItem.amount + 1, totalPrice: (parseFloat(cartItem.totalPrice) + parseFloat(price)).toFixed(2)}
                }     
                // Decrease
                if(type === 'decrease') {
                    if(amount > 0) {
                        return { ...cartItem, amount: cartItem.amount -1, totalPrice: (parseFloat(cartItem.totalPrice) - parseFloat(price)).toFixed(2)}
                    }   
                }       
            }
            return cartItem
        }).filter((cartItem) => cartItem.amount !== 0)) // Delete items with 0 quantity
    }

    
    const clearCart = () => {
        setCartItems([]);
        setTotalCartValue(0);
    }


    // CHECK FOR INVENTORY CONFLICTS //
    const checkInventoryConflict = (product_id) => {        
        const matchingInventoryItem = inventory.find((inventory_item) => inventory_item.product_id === product_id)  
        const matchingCartItem = cartItems.find((cartItem) => cartItem.product.product_id === product_id)

        if(matchingCartItem) {
            if(matchingCartItem.amount + 1 > matchingInventoryItem.stock) {
                setIsConflictboxOpen({state:true, item:matchingInventoryItem.product_name, amountLeft: matchingInventoryItem.stock})
                return true
            }
        } else { 
            if(matchingInventoryItem.stock === 0) {
                setIsConflictboxOpen({state:true, item:matchingInventoryItem.product_name, amountLeft: matchingInventoryItem.stock})
                return true
            }
        }
        return false
    }


    // FETCH PRODUCTS //
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


    // FETCH INVENTORY //
    useEffect(() => {
        const fetchInventory = async() => {
            try {
                const response = await fetch(`http://localhost:3001/api/v1/inventory`)
                const data = await response.json()
                setInventory(data);
            } catch(err) {
                console.error(err.message);
            }
        }
        fetchInventory()
    }, [products, currentLocation, cartItems])    


    // OTHER USE-EFFECTS //

    // find page location
    const location = useLocation();
    useEffect(() => {
        setCurrentLocation(location.pathname)
        // Adjust the search bar
        if(location.pathname !== '/products') {
            setIsSearchbarOpen(false);
            setSearchProduct('');
        }        
    }, [location])

    // calculate the total cart amount and total cart price
    useEffect(() => {
        const calcTotalAmount = () => {    
            setTotalCartAmount(0)
            setTotalCartValue(0)
            if(cartItems.length > 0) {

                setTotalCartValue(cartItems.reduce((total, item) => {
                    return (parseFloat(item.totalPrice) + parseFloat(total)).toFixed(2)
                }, 0))                    
                
                setTotalCartAmount(cartItems.reduce((total, item) => {
                    return item.amount + total
                }, 0))
            } 
        }
        calcTotalAmount();
    }, [cartItems, setTotalCartAmount, setTotalCartValue])
   

    // Remove sortMethod after search input
    useEffect(() => {
        setSortMethod('');
    }, [searchProduct])

    
    // RETURN //
    return (
        <AppContext.Provider value={{
            currentLocation,

            isSidebarOpen,
            toggleSidebar,

            isSearchbarOpen,
            setIsSearchbarOpen,
            toggleSearchbar,

            isSortboxOpen,
            toggleSortBox,

            isConflictboxOpen,
            toggleConflictbox,
            checkInventoryConflict, 
            
            isSuccesfulOrderOpen,
            setIsSuccesfulOrderOpen,
            toggleSuccesfulOrderbox,

            loading,
            setLoading,

            products,
            setProducts,
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