import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {thunk} from "redux-thunk"; // Import using default import
import productsReducer from './Redux/slices/productsSlice';
import productReducer from './Redux/slices/productSlice';
import authReducer from './Redux/slices/authSlice';
import cartReducer from './Redux/slices/cartSlice';
import orderReducer from './Redux/slices/orderSlice';
import userReducer from './Redux/slices/userSlice';



const reducer = combineReducers({
  productsState: productsReducer,
  productState: productReducer, 
  authState: authReducer,
  cartState: cartReducer,
  orderState: orderReducer,
  userState :userReducer
});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
