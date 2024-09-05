import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = '$';
    const delivery_fe = 10;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({})
    const navigate = useNavigate()

    const addToCart = async (itemId, size) => {

        if (!size) {
            toast.error('Please select a size')
            return
        }
        let cartData = structuredClone(cartItems)
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1
                toast.success('Added')
            }
            else {
                cartData[itemId][size] = 1
                toast.success('Added')
            }
        }
        else {
            cartData[itemId] = {}
            cartData[itemId][size] = 1
            toast.success('Added')
        }
        setCartItems(cartData)
    }

    const getCartCount = () => {
        let count = 0;
        for (const item in cartItems) {
            for (const size in cartItems[item]) {
                count += cartItems[item][size]
            }
        }
        return count
    }

    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems)
        cartData[itemId][size] = quantity
        setCartItems(cartData)
        getCartCount()
        console.log(cartData)
    }

    const DeleteProductToCart = async (itemId, size) => {
        console.log('Delete Product', itemId, size)
        let cartData = structuredClone(cartItems)
        delete cartData[itemId][size]
        if (Object.keys(cartData[itemId]).length === 0) {
            delete cartData[itemId]
        }
        setCartItems(cartData);
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            const product = products.find(product => product._id === item)
            for (const size in cartItems[item]) {
                totalAmount += cartItems[item][size] * product.price
            }
        }
        return totalAmount
    }


    const value = {
        products, currency, delivery_fe,
        search, setSearch, showSearch, setShowSearch,
        addToCart, cartItems,
        getCartCount,
        DeleteProductToCart, updateQuantity,
        getCartAmount, navigate
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;