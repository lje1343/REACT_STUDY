import { createSlice, current } from "@reduxjs/toolkit";

let recentlyViewed = createSlice({
  name: "recentlyViewed",
  initialState: [],
  reducers: {
    changeViewdlist(state, param) {
      const checkExistObj = state.findIndex(
        (obj) => obj.id === param.payload.data.id
      );
      const checkCount = state.length + 1;

      if (checkExistObj === -1) {
        if (checkCount > 3) {
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

export let { changeViewdlist } = recentlyViewed.actions;
export { recentlyViewed };
