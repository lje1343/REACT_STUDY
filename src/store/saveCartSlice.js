import { createSlice, current } from "@reduxjs/toolkit";

let saveCart = createSlice({
  name: "saveCart",
  initialState: [
    { id: 0, name: "White and Black", count: 2 },
    { id: 2, name: "Grey Yordan", count: 1 },
  ],
  reducers: {
    changeQuantityShoes(state, param) {
      const idx = state.findIndex((obj) => obj.id === param.payload.data.id);
      if (param.payload.type === "plus") {
        state[idx].count += 1;
      } else {
        if (state[idx].count === 1) {
          const deleteChk = window.confirm(
            "현재 수량이 1개입니다. 카트에서 삭제하시겠습니까?"
          );
          if (deleteChk) {
            state.splice(idx, 1);
            window.alert("삭제되었습니다.");
          }
        } else {
          state[idx].count -= 1;
        }
      }
    },
    addShoes(state, param) {
      const existObj = state.findIndex(
        (obj) => obj.id === param.payload.data.id
      );
      if (existObj === -1) {
        const addObj = {
          id: param.payload.data.id,
          name: param.payload.data.title,
          count: 1,
        };
        return state.concat(addObj);
      }
    },
  },
});

export let { changeQuantityShoes, addShoes } = saveCart.actions;
export { saveCart };
