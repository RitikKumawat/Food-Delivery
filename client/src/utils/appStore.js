import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartReducer from "./userSlice";
import authReducer from "./authSlice";
const appStore = combineReducers({
    cart: cartReducer,
    auth:authReducer,
  
});

export default appStore;
