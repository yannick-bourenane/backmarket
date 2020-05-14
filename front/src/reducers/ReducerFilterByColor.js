function filterByColor(arr, color) {
  return color ? arr.filter((shirt) => shirt.color === color) : arr;
}

const ReducerFilterByColor = (state = { data: {}, filters: {} }, action) => {
  switch (action.type) {
    case "FILTERBYCOLOR":
      let arrFilterColor = ["toto"];
      state.filters.color = action.color;

      // On filtre avec la couleur qui vient d'être cliquée
      arrFilterColor = filterByColor(arrFilterColor, action.color);
      state.data = arrFilterColor;
      return state;
    default:
      return state;
  }
};
export default ReducerFilterByColor;
