const ReducerFetchFilteredPhones = (state = { data:[] }, action) => {
    switch (action.type) {
    case "FETCHHIGH":
    state.data = action.data
      return state;
    default:
      return state;
  }
}

export default ReducerFetchFilteredPhones