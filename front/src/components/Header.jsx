import React from "react";
import Logo from "./Header/Logo";
import SearchBar from "./Header/SearchBar";
import MenuHeader from "./Header/MenuHeader";
import { Columns, Column } from "bloomer";

const Header = () => {
  return (
    <header className="main-header">
      <Columns isVCentered>
        <Column isSize="2">
          <Logo />
        </Column>
        <Column isSize="6">
          <SearchBar />
        </Column>
        <Column isSize="4">
          <MenuHeader />
        </Column>
      </Columns>
    </header>
  );
};

export default Header;
