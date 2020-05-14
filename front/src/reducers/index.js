import ReducerFilterByColor from "./ReducerFilterByColor";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  dataFilteredByColor: ReducerFilterByColor,
});

export default allReducers;
