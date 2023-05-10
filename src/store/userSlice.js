import { createSlice } from "@reduxjs/toolkit";

let user = createSlice({
  name: "user",
  initialState: {name: "xldmsdl", age:25},
  reducers: {
    changeName(state) {
      state.name = "pretty xldmsdl";
    },
        addAge(state, param) {
      state.age += param.payload;
    },
  },
});

export let { changeName, addAge } = user.actions;
export {user};