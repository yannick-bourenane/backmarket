import ReducerFetchAllPhones from "./ReducerFetchAllPhones";
import ReducerFetchFilteredPhones from "./ReducerFetchFilteredPhones";
import ReducerFilterByBrand from "./ReducerFilterByBrand"
import { combineReducers } from "redux";

const allReducers = combineReducers({
  fetchAllPhones: ReducerFetchAllPhones,
  fetchFilteredPhones: ReducerFetchFilteredPhones,
  filterByBrand : ReducerFilterByBrand
});

export default allReducers;
