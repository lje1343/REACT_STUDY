import { createSlice } from "@reduxjs/toolkit";

let user = createSlice({
  name: "user",
  initialState: [],
  reducers: {
    registerUser(state, param) {
      param.payload.data.id = param.payload.data.email;
      state.push(param.payload.data);
      window.alert("회원가입이 완료되었습니다.");
      return;
    },
    deleteUser(state, param) {
      window.alert("탈퇴처리가 완료되었습니다.");
      // 이것은 탈퇴임
    },
  },
});

export let { registerUser, deleteUser } = user.actions;
export { user };
