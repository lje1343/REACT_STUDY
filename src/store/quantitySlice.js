import { createSlice } from "@reduxjs/toolkit";

let quantity = createSlice({
  name: "quantity",
  initialState: [10, 20, 30],
});

export {quantity};