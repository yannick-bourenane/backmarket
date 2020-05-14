import React from "react";
import { filterByColor } from "../actions";
import { useSelector, useDispatch } from "react-redux";

const Home = () => {
  const dataFilteredByColor = useSelector((state) => state.dataFilteredByColor);
  const dispatch = useDispatch();
  const functionOnClick = (color) => {
    dispatch(filterByColor(color));
  };
  return <div>homepage</div>;
};

export default Home;
