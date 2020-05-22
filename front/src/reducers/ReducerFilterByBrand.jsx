function filterByBrand(arr, brands) {
  return brands ? arr.filter((phone) => phone.brand === brands) : arr;
}

const ReducerFilterByBrand = (state = [], action) => {
  switch (action.type) {
      case'FILTER_BY_BRAND':
      state = filterByBrand(action.phones, action.brands);
      return state;
    default:
      return state;
  }
};
export default ReducerFilterByBrand;
