import { createSlice } from "@reduxjs/toolkit";

let shoes = createSlice({
  name: "shoesList",
  initialState: [],
  reducers: {
    updateShoesList(state, param) {
      return param.payload.data;
    },
  },
});

export let { updateShoesList } = shoes.actions;
export { shoes };
