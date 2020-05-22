import React from "react";
import Logo from "./Header/Logo";
import SearchBar from "./Header/SearchBar";
import MenuHeader from "./Header/MenuHeader";

const Header = () => {
  return (
    <header className="main-header">
      <Logo />

      <SearchBar />

      <MenuHeader />
    </header>
  );
};

export default Header;
