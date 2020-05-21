import React from "react";
import { fetchAllPhones } from "../actions";
import { useSelector, useDispatch } from "react-redux";

const Home = () => {
  const dataAllPhones = useSelector((state) => state.fetchAllPhones.data);
  const dispatch = useDispatch();
  return <div>{console.log("je suis dataallphones" + dataAllPhones)} {dataAllPhones.length && dataAllPhones.map(phone => <li>{phone.DeviceName}</li>)}</div>;
};

export default Home;
