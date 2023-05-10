import { createSlice } from "@reduxjs/toolkit";

let saveCart = createSlice({
  name: "saveCart",
  initialState: [
    { id: 0, name: "White and Black", count: 2 },
    { id: 2, name: "Grey Yordan", count: 1 },
  ],
  reducers: {
    addShoes(state, idx) {
      state[idx.payload].count = state[idx.payload].count + 1
    },
  },
});

export let { addShoes } = saveCart.actions;
export  {saveCart};