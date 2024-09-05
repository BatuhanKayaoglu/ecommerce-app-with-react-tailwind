import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../context/ShopContext"
import ProductItem from "../components/ProductItem"
import Title from "./Title"

const RelatedProducts = ({ category, subCategory }) => {

    const { products } = useContext(ShopContext)
    const [related, setRelated] = useState([])

    useEffect(() => {
        fetchRelated();
    }, [products])

    const fetchRelated = () => {
        const relatedProducts = products.filter(product => product.category === category && product.subCategory === subCategory)
        setRelated(relatedProducts.slice(0, 5))
    }

    return (
        <div className="my-24">
            <Title text1={'RELATED'} text2={'PRODUCTS'} />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 gap-y-6 mt-5">
                {related.map((product, index) => (
                    <ProductItem key={index} id={product._id} image={product.image} name={product.name} price={product.price}></ProductItem>
                ))}
            </div>
        </div>

    )
}

export default RelatedProducts