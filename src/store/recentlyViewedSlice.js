import { createSlice, current } from "@reduxjs/toolkit";

let recentlyViewed = createSlice({
  name: "recentlyViewed",
  initialState: [],
  reducers: {
    updateViewdList(state, param) {
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
          const newObj = {
            ...param.payload.data,
            ...{ user: param.payload.user },
          };
          return state.concat(newObj);
        }
      }
    },
  },
});

export let { updateViewdList } = recentlyViewed.actions;
export { recentlyViewed };
