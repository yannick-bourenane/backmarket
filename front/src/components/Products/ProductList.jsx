import React from 'react'
import {useSelector} from 'react-redux'

const ProductList = (props) => {
    const products = useSelector(state => state.fetchAllPhones.data)
let brandArray = new Set(products.map(brand =>brand.Brand))
    // props.sales / props.number
    return (
        <div>
        {console.log(brandArray)}
        {/* {brandArray && brandArray.map(brand => <><input type="checkbox" id={brand} /> <label>{brand}</label></>)} */}
        {console.log(products)}
        {products.map(product => <li>{product.DeviceName}</li>)}
        </div>
    )
}

export default ProductList
