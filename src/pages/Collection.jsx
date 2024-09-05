import { useContext, useEffect, useState } from "react"
import { ShopContext } from '../context/ShopContext'
import { assets } from "../assets/assets"
import Title from "../components/Title"
import ProductItem from "../components/ProductItem"

const Collection = () => {

    const { products, search, showSearch } = useContext(ShopContext)
    const [showFilter, setShowFilter] = useState(false)
    const [filterProducts, setFilterProducts] = useState([])
    const [selectedCategory, setSelectedCategory] = useState([])
    const [selectedSubCategory, setSelectedSubCategory] = useState([])
    const [sortValue, setSortValue] = useState("relavent");

    useEffect(() => {
        let filtered = products;

        if (search && showSearch) {
            filtered = products.filter(product => product.name.toLowerCase().includes(search.toLowerCase()));
        }

        if (selectedCategory.length > 0) {
            filtered = filtered.filter(product =>
                selectedCategory.includes(product.category)
            );
        }
        if (selectedSubCategory.length > 0) {
            filtered = filtered.filter(product =>
                selectedSubCategory.includes(product.subCategory)
            );
        }

        if (sortValue) {
            console.log(sortValue)
            if (sortValue === 'low-high') {
                console.log("GİRDİ")
                filtered = filtered.sort((a, b) => a.price - b.price);
                console.log(filtered)
            }
            else if (sortValue === 'high-low') {
                filtered = filtered.sort((a, b) => b.price - a.price);
            }
        }

        setFilterProducts(filtered);
    }, [selectedCategory, selectedSubCategory, products, sortValue, search]);

    const handleCategoryChange = (event) => {
        const value = event.target.value;
        setSelectedCategory(prev =>
            prev.includes(value) ? prev.filter(cat => cat !== value) : [...prev, value]
        );
    };

    const handleSubcategoryChange = (event) => {
        const value = event.target.value;
        setSelectedSubCategory(prev =>
            prev.includes(value) ? prev.filter(sub => sub !== value) : [...prev, value]
        );
    };

    const handleSortChange = (e) => {
        const value = e.target.value;
        setSortValue(value);
    };


    return (
        <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 border-t pt-10">
            {/* Filter Options */}
            <div className="min-w-60">
                <p onClick={() => setShowFilter(!showFilter)} className="my-2 text-xl flex items-center gap-2 cursor-pointer">FILTERS</p>
                <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
                {/* Category Filter */}
                <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
                    <p className="mb-3 text-sm font-medium">CATEGORIES</p>
                    <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                        <p className="flex gap-2">
                            <input className="w-3" type="checkbox" value={'Men'} onChange={handleCategoryChange} />Men
                        </p>
                        <p className="flex gap-2">
                            <input className="w-3" type="checkbox" value={'Women'} onChange={handleCategoryChange} />Women
                        </p>
                        <p className="flex gap-2">
                            <input className="w-3" type="checkbox" value={'Kids'} onChange={handleCategoryChange} />Kids
                        </p>
                    </div>
                </div>
                {/* SubCategoryFilter */}
                <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
                    <p className="mb-3 text-sm font-medium">TYPE</p>
                    <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                        <p className="flex gap-2">
                            <input className="w-3" type="checkbox" value={'Topwear'} onChange={handleSubcategoryChange} />Topwear
                        </p>
                        <p className="flex gap-2">
                            <input className="w-3" type="checkbox" value={'Bottomwear'} onChange={handleSubcategoryChange} />Bottomwear
                        </p>
                        <p className="flex gap-2">
                            <input className="w-3" type="checkbox" value={'Winterwear'} onChange={handleSubcategoryChange} />Winterwear
                        </p>
                    </div>
                </div>
            </div>
            {/* Right Side */}
            <div className="flex-1">
                <div className="flex justify-between text-base sm:text-2xl mb-4">
                    <Title text1={'ALL'} text2={'COLLECTIONS'} />
                    {/* Product Sort */}
                    <select className="border-2 border-gray-300 text-sm px-2" value={sortValue} onChange={handleSortChange}>
                        <option value="relavent">Sort by Relevant</option>
                        <option value="low-high">Low to High</option>
                        <option value="high-low">High to Low</option>
                    </select>
                </div>
                {/* Product Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
                    {filterProducts.map((product, index) => (
                        <ProductItem key={index} id={product._id} image={product.image} name={product.name} price={product.price}></ProductItem>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Collection