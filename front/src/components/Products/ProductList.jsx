import React from 'react'
import {useSelector} from 'react-redux'

const ProductList = (props) => {
    const products = useSelector(state => state.filterByBrand)

    // props.sales / props.number
    return (
        <div>
        {products.map(product => <li>{product.DeviceName}</li>)}
        </div>
    )
}

export default ProductList
