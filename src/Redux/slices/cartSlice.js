import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    loading: false,
    items: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
     shippingInfo:  localStorage.getItem("shippingInfo")
     ? JSON.parse(localStorage.getItem("shippingInfo"))
     : {},
  },

  reducers: {
    addCartItemsRequest(state) {
      state.loading = true;
    },
    addCartItemsSuccess(state, action) {
      const item = action.payload;
      const isItemExists = state.items.find(i => i.productId === item.productId);
      if (!isItemExists) {
        state.items.push(item);
        localStorage.setItem("cartItems", JSON.stringify(state.items));
      }
      state.loading = false;
    },
    increaseCartItemQty(state, action) {
      state.items = state.items.map(item => {
        if (item.productId === action.payload) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    decreaseCartItemQty(state, action) {
      state.items = state.items.map(item => {
        // action.payload = it contains productId
        if (item.productId === action.payload) { //intha condition true ah iruntha ithuvae return aayidum ithu true ah illena item return aayidum
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;  
      });
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    removeItemFromCart(state, action) {
      state.items = state.items.filter(item => item.productId !== action.payload);
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    saveShippingInfo(state, action){
      state.shippingInfo = action.payload;
      localStorage.setItem("shippingInfo", JSON.stringify(state.shippingInfo));


    },
    orderCompleted(state, action){
     
      localStorage.removeItem("shippingInfo");
      localStorage.removeItem("cartItems");
      sessionStorage.removeItem("orderInfo");
      return{
        ...state,
        items: [],
        loading: false,
        shippingInfo: {},
      
      }


    }
  },
});

const { actions, reducer } = cartSlice;

export const {
  addCartItemsRequest,
  addCartItemsSuccess,
  increaseCartItemQty,
  decreaseCartItemQty,
  removeItemFromCart,
  saveShippingInfo,
  orderCompleted
} = actions;
export default reducer;
