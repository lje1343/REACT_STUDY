import { configureStore } from "@reduxjs/toolkit";
import { user } from "./store/userSlice.js";
import { quantity } from "./store/quantitySlice.js";
import { saveCart } from "./store/saveCartSlice.js";
import { recentlyViewed } from "./store/recentlyViewedSlice.js";

export default configureStore({
  reducer: {
    user: user.reducer,
    quantity: quantity.reducer,
    saveCart: saveCart.reducer,
    recentlyViewed: recentlyViewed.reducer,
  },
});
