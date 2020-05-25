import React, { useState } from "react";
import { useSelector } from "react-redux";

const ProductList = (props) => {
  const [brands, setBrands] = useState([]);
  const products = useSelector((state) => state.fetchAllPhones.data);
  let brandsPhones = [...new Set(products.map((brand) => brand.Brand))];

  function filterByBrand(e, arr, brands) {
    if (brands.includes(e.target.value)) {
      return setBrands(brands.filter((m) => m !== e.target.value));
    }
    setBrands([...brands, e.target.value]);
    
  }

  // props.sales / props.number
  return (
    <div>
      {brandsPhones &&
        brandsPhones.map((brand) => (
          <>
            <input
              type="checkbox"
              value={brand}
              onChange={filterByBrand}
              id={brand}
            />{" "}
            <label>{brand}</label>
          </>
        ))}
      {products.map((product) => (
        <li>{product.DeviceName}</li>
      ))}

      {console.log(brands)}
    </div>
  );
};

export default ProductList;
