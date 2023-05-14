import { createSlice, current } from "@reduxjs/toolkit";
import { createContext, useState } from "react";

let recentlyViewed = createSlice({
  name: "recentlyViewed",
  initialState: [],
  reducers: {
    changeViewdList(state, param) {
      const checkExistObj = state.findIndex(
        (obj) => obj.id === param.payload.data.id
      );
      const checkCount = state.length + 1;

      if (checkExistObj === -1) {
        if (checkCount > 5) {
          let tempArr = [...current(state)];
          tempArr = tempArr.splice(1);
          tempArr = tempArr.concat(param.payload.data);
          return tempArr;
        } else {
          return state.concat(param.payload.data);
        }
      }
    },
  },
});

export let { changeViewdList } = recentlyViewed.actions;
export { recentlyViewed };
