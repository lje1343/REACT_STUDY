import { createSlice } from "@reduxjs/toolkit";

let board = createSlice({
  name: "board",
  initialState: [],
  reducers: {
    registerBoard(state, param) {},
    updateBoard(state, param) {},
    deleteBoard(state, param) {},
  },
});

export let { registerBoard, updateBoard, deleteBoard } = board.actions;
export { board };
