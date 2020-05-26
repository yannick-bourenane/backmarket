import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const ProductList = (props) => {
  const products = useSelector((state) => state.fetchAllPhones.data);
  const [selectedBrands, setSelectedBrands] = useState([]);
  let brandsPhones = [...new Set(products.map((brand) => brand.Brand))];



  function handleSelectedBrands(e) {
      if (selectedBrands.includes(e.target.value)) {
      return setSelectedBrands(selectedBrands.filter((m) => m !== e.target.value));
    }
    setSelectedBrands([...selectedBrands, e.target.value]);
  }

  function filterSelectedBrands() {
    if(selectedBrands.length === 0)
    return products 
    else 
    return products.filter((p) => selectedBrands.includes(p.Brand))
  }



  // props.sales / props.number
  return (
    <div>
          {console.log("THIS IS BRANDS" + selectedBrands)}

      {brandsPhones &&
        brandsPhones.map((brand) => (
          <>
            <input
              type="checkbox"
              value={brand}
              onChange={handleSelectedBrands}
              id={brand}
            />{" "}
            <label>{brand}</label>
          </>
        ))}
      {filterSelectedBrands().map((product) => (
        <li>{product.DeviceName}</li>
      ))}

    </div>
  );
};

export default ProductList;
