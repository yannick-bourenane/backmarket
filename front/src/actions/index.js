export const fetchAllPhones = (data) => {
  return {
    type: "FETCHALLPHONES",
    data:data,
  };
};

export const fetchHigh = (data) => {
  return {
    type: "FETCHHIGH",
    data:data,
  }
}

export const filterByBrand = (phones,brands) => {
  return {
    type:"FILTER_BY_BRAND",
    phones : phones,
    brands : brands
  }
}