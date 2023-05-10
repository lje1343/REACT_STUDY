import { configureStore, createSlice } from "@reduxjs/toolkit";

let user = createSlice({
  name: "user",
  initialState: "xldmsdl",
  reducers: {
    changeName(state) {
      return "beautiful " + state;
    },
  },
});

let quantity = createSlice({
  name: "quantity",
  initialState: [10, 20, 30],
});

let saveCart = createSlice({
  name: "saveCart",
  initialState: [
    { id: 0, name: "White and Black", count: 2 },
    { id: 2, name: "Grey Yordan", count: 1 },
  ],
  reducers: {
    addShoes(state) {
      state = state + 1;
    },
  },
});

export let { changeName } = user.actions;
export let { addShoes } = saveCart.actions;

export default configureStore({
  reducer: {
    user: user.reducer,
    quantity: quantity.reducer,
    saveCart: saveCart.reducer,
  },
});
