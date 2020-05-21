import React from "react";
import { fetchAllPhones } from "../actions";
import { useSelector, useDispatch } from "react-redux";
import { Container } from 'semantic-ui-react'
import Header from "components/Header";
import Footer from "components/Footer";
import Slider from "components/Slider";
import CategorieList from "components/Categories/CategoriesList";
import ProductList from "components/Products/ProductList";
import FaqExcerpt from "components/FaqExcerpt";
import Concept from "components/Concept";
const Home = () => {
  // const dataAllPhones = useSelector((state) => state.fetchAllPhones.data);
  // const dispatch = useDispatch();
    return (
      <div>
        <Header />
        <Slider/>
        <Container>
          <CategorieList/>
          <Concept/>
          <ProductList sales={true} number="4"/>
          <FaqExcerpt/>
        </Container>
        <Footer/>
        </div>
    )
};

export default Home;
