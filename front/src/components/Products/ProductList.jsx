import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { filterByBrand } from "../../actions"

const ProductList = (props) => {
  const products = useSelector((state) => state.fetchAllPhones.data);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceMax, setPricemax] = useState(0);
  const [priceMin, setPriceMin] = useState(0)
  let brandsPhones = [...new Set(products.map((brand) => brand.Brand))];
  const dispatch = useDispatch();

  function handleSelectedBrands(e) {
    if (selectedBrands.includes(e.target.value)) {
      return setSelectedBrands(
        selectedBrands.filter((m) => m !== e.target.value)
      );
    }
    setSelectedBrands([...selectedBrands, e.target.value]);
  }

 
  function filterSelectedProducts() {
    if (selectedBrands.length === 0) return products;
    else return products.filter((p) => selectedBrands.includes(p.Brand));
  }

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
        <label>Prix maximum</label>
        <input type="number" name="" id="" onChange={e => setPricemax(e.target.value)}/>
        <label>Prix minimum</label>
        <input type="number" name="" id="" onChange={e => setPriceMin(e.target.value)}/>
      {filterSelectedProducts().map((product) => (
        <li>{product.DeviceName}</li>
      ))}
      
    </div>
  );
};

export default ProductList;
