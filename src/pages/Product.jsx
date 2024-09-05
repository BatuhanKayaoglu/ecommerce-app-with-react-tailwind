import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ShopContext } from "../context/ShopContext"
import { assets } from "../assets/assets"
import RelatedProducts from "../components/RelatedProducts"

const Product = () => {
    const { productId } = useParams()
    const { products, currency, addToCart } = useContext(ShopContext)
    const [productData, setproductData] = useState(false)
    const [image, setImage] = useState('')
    const [size, setSize] = useState('')



    // const prodData = products.find(product => product._id === productId);
    const fetchProductData = async () => {
        products.map((item) => {
            if (item._id === productId) {
                setproductData(item)
                setImage(item.image[0])
                return null
            }
        })
    }

    useEffect(() => {
        fetchProductData()
    }, [productId, products])

    return productData ? (
        <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
            {/* {ProductData} */}
            <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
                {/* {ProductImages} */}
                <div className="flex-1 flex flex-col-reverse  gap-3 sm:flex-row">
                    <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
                        {productData.image.map((img, index) => (
                            <img
                                onClick={() => setImage(img)}
                                key={index}
                                className="w-[24%] sm:w-full sm:mb-3 flex-shrink cursor-pointer"
                                src={img}
                                alt={`Product image ${index + 1}`}
                            />
                        ))}
                    </div>
                    <div className="w-full sm:w-[80%]">
                        <img src={image} className="w-full h-auto" alt="" />
                    </div>
                </div>
                {/* {ProductDetails} */}
                <div className="flex-1 ">
                    <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
                    <div className="flex items-center gap-1 mt-2">
                        <img src={assets.star_icon} className="w-3" />
                        <img src={assets.star_icon} className="w-3" />
                        <img src={assets.star_icon} className="w-3" />
                        <img src={assets.star_icon} className="w-3" />
                        <img src={assets.star_dull_icon} className="w-3" />
                        <p className="pl-2">(122)</p>
                    </div>
                    <p className="mt-5 text-3xl font-medium">{currency}{productData.price}</p>
                    <p className="mt-5 text-gray-500 md:w-4/5">{productData.description}</p>
                    <div className="flex flex-col gap-4 my-8">
                        <p>Select Size</p>
                        <div className="flex gap-2">
                            {productData.sizes.map((item, index) => (
                                <button onClick={() => setSize(item)} className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-500' : null}`} key={index}>{item}</button>
                            ))}
                        </div>
                    </div>
                    <button onClick={() => addToCart(productData._id, size)} className="bg-black text-white px-8 py-3 text-sm active:bg-slate-500">ADD TO CARD</button>
                    <hr className="mt-8 sm:w-4/5" />
                    <div className="text-sm text-gray-500 flex flex-col gap-1 mt-4">
                        <p>100% Original Product</p>
                        <p>Cash on delivery is available on this product</p>
                        <p>Easy return to 7 days</p>
                    </div>
                </div>
            </div>
            {/* {Description} */}
            <div className="mt-20">
                <div className="flex">
                    <b className="border px-5 py-3 text-sm">Description</b>
                    <p className="border px-5 py-3 text-sm">Reviews (122)</p>
                </div>
                <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat est quasst quasi consectetur rerum deleniti eos ad dolores alias architecto laborum sit odit voluptas maiores, est quasi consectetur rerum deleniti eos ad dolores alias architecto laborum sit odit voluptas maiores, ei consectetur rerum deleniti eos ad dolores alias architecto laborum sit odit voluptas maiores, explicabo quod veritatis hic numquam esse.</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, necessitatibus quisquam maiores at hic a. Adipisci accusa.</p>
                </div>
            </div>
            {/* {display related products} */}
            <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
        </div>
    ) : <div className="opacity-0"></div>
}

export default Product
