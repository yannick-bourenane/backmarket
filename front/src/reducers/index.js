import ReducerFetchAllPhones from "./ReducerFetchAllPhones";
import ReducerFetchFilteredPhones from "./ReducerFetchFilteredPhones";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  fetchAllPhones: ReducerFetchAllPhones,
  fetchFilteredPhones: ReducerFetchFilteredPhones,
});

export default allReducers;
