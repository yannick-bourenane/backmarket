import React from "react";
import { useSelector } from "react-redux";

const ListBrands = () => {
  const products = useSelector((state) => state.fetchAllPhones.data);
  let brandsPhones = [...new Set(products.map((brand) => brand.Brand))];
  return (
    <ul>
      {brandsPhones &&
        brandsPhones.map((brand) => <li key={brand}>{brand}</li>)}
    </ul>
  );
};

export default ListBrands;
