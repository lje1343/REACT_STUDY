import { configureStore } from "@reduxjs/toolkit";
import { user } from "./userSlice.js";
import { saveCart } from "./saveCartSlice.js";
import { recentlyViewed } from "./recentlyViewedSlice.js";
import { shoes } from "./shoesSlice.js";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";

const reducers = combineReducers({
  user: user.reducer,
  saveCart: saveCart.reducer,
  recentlyViewed: recentlyViewed.reducer,
  shoes: shoes.reducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: [thunk],
});
