import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../context/ShopContext"
import Title from "../components/Title"
import { assets } from "../assets/assets"
import CartTotal from "../components/CartTotal"

const Cart = () => {

    const { products, currency, cartItems, updateQuantity, DeleteProductToCart, navigate } = useContext(ShopContext)
    const [cartData, setCartData] = useState([])
    const [quantity, setQuantity] = useState()

    console.log(cartItems)

    useEffect(() => {
        let data = []
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                data.push({
                    _id: items,
                    size: item,
                    quantity: cartItems[items][item],
                })
            }
        }
        setCartData(data)
    }, [cartItems])

    const handleChangeUpdate = (itemId, size, quantity) => {
        updateQuantity(itemId, size, Number(quantity));
    }


    return (
        <div className="border-t pt-14">
            <div className="text-2xl mb-3">
                <Title title1={"YOUR"} title2={"CART"} />
            </div>
            <div>
                {cartData.map((item, index) => {
                    const product = products.find(product => product._id === item._id)
                    return (
                        <div key={index} className="border-t border-b py-4 text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-2">
                            <div className="flex items-start gap-6">
                                <img src={product.image[0]} className="w-16 sm:w-20" alt="" />
                                <div>
                                    <h1 className="font-medium text-lg">{product.name}</h1>
                                    <div className="flex items-center gap-5 mt-2">
                                        <p className="font-medium">{currency}{product.price}</p>
                                        <p className="text-gray-400 px-2 bg-slate-50">{item.size}</p>
                                    </div>
                                </div>
                            </div>
                            <input type="number" min={1} defaultValue={item.quantity} value={quantity} onChange={(e) => handleChangeUpdate(item._id, item.size, e.target.value)} className="border max-w-10 px-1 sm:px-2 py-1" />
                            <img onClick={() => DeleteProductToCart(item._id, item.size)} src={assets.bin_icon} className="w-4 mr-4 sm:w-5 cursor-pointer" alt="" />
                        </div>
                    )
                })}
            </div>
            <div className="flex justify-end my-20">
                <div className="w-full sm:w-[450px]">
                    <CartTotal />
                    <div className="w-full text-end">
                        <button onClick={() => navigate('place-order')} className="bg-black text-white my-8 px-8 py-3">PROCEED TO CHECKOUT</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart