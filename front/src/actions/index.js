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