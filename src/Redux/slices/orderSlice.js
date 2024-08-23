import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    loading: false,
    orderDetails: {},
    userOrders: [],
  },

  reducers: {
    createOrderRequest(state) {
      return {
        ...state,
        loading: true,
      };
    },
    createOrderSuccess(state, action) {
      return {
        ...state,
        loading: false,
        orderDetails: action.payload.orders,
      };
    },
    createOrderFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    },
    clearError(state, action) {
      return {
        ...state,
        error: null,
      };
    },

    getUserOrdersRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    getUserOrdersSuccess(state, action) {
      return {
        ...state,
        loading: false,
        userOrders: action.payload.orders
      };
    },
    getUserOrdersFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
  },
});

const { actions, reducer } = orderSlice;

export const {
  createOrderRequest,
  createOrderSuccess,
  createOrderFail,
  clearError,
  getUserOrdersFail,
  getUserOrdersRequest,
  getUserOrdersSuccess,
} = actions;
export default reducer;
