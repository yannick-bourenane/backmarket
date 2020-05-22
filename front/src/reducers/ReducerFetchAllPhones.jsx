const ReducerFetchAllPhones = (state = { data: [] }, action) => {
  switch (action.type) {
    case "FETCHALLPHONES":
      state.data = action.data;
      return state;
    default:
      return state;
  }
};

export default ReducerFetchAllPhones;
