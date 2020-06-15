import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Field,
  Control,
  Input,
  Icon,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownDivider,
  DropdownContent,
} from "bloomer";
const SearchBar = () => {
  const products = useSelector((state) => state.fetchAllPhones.data);

  const [searchedProducts, setSearchedProducts] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    searchedProducts.length > 0
      ? setSearchedProducts(searchedProducts)
      : setSearchedProducts(products);
  }, [products, searchedProducts]);

  const handleSearch = (e) => {
    setIsDropdownOpen(true);
    setSearchedProducts(
      products.filter((product) => product.DeviceName.includes(e.target.value))
    );
  };

  return (
    <>
      <Field>
        <Control hasIcons="right">
          <Dropdown isActive={isDropdownOpen}>
            <DropdownTrigger onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              <Input
                placeholder="Trouver un smartphone"
                onChange={handleSearch}
              />
              <Icon className="fa fa-search" isAlign="right " />
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownContent>
                {searchedProducts &&
                  searchedProducts.map(
                    (product, i) =>
                      i < 5 && (
                        <div key={i}>
                          {i !== 0 && <DropdownDivider />}
                          <DropdownItem href="#">
                            {product.DeviceName}
                          </DropdownItem>
                        </div>
                      )
                  )}
              </DropdownContent>
            </DropdownMenu>
          </Dropdown>
        </Control>
      </Field>
    </>
  );
};

export default SearchBar;
