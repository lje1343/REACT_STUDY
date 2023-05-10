import { configureStore } from "@reduxjs/toolkit";
import {user} from './store/userSlice.js'
import { quantity } from './store/quantitySlice.js'
import {saveCart} from './store/saveCartSlice.js'

export default configureStore({
  reducer: {
    user: user.reducer,
    quantity: quantity.reducer,
    saveCart: saveCart.reducer,
  },
});
