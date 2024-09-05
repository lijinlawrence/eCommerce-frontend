import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    loading: false,
    orderDetails: {},
    userOrders: [],
    adminOrders:[],
    isOrderDeleted: false,
    isOrderUpdated: false
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
        error: action.payload,
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
        userOrders: action.payload.orders,
      };
    },
    getUserOrdersFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    orderDetailsRequest(state) {
      return {
        ...state,
        loading: true,
      };
    },
    orderDetailsSuccess(state, action) {
      return {
        ...state,
        loading: false,
        orderDetails: action.payload.order,
      };
    },
    orderDetailsFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    adminOrdersRequest(state) {
      return {
        ...state,
        loading: true,
      };
    },
    adminOrdersSuccess(state, action) {
      console.log(action.payload);
      
      return {
        ...state,
        loading: false,
        adminOrders: action.payload.orders,
      };
    },
    adminOrdersFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },

    deleteOrderRequest(state, action) {
        return {
            ...state,
            loading: true
        }
    },
    deleteOrderSuccess(state, action) {
        return {
            ...state,
            loading: false,
            isOrderDeleted: true
        }
    },
    deleteOrderFail(state, action) {
        return {
            ...state,
            loading: false,
            error: action.payload
        }
    },

    updateOrderRequest(state, action) {
        return {
            ...state,
            loading: true
        }
    },
    updateOrderSuccess(state, action) {
        return {
            ...state,
            loading: false,
            isOrderUpdated: true
        }
    },
    updateOrderFail(state, action) {
        return {
            ...state,
            loading: false,
            error: action.payload
        }
    },

    clearOrderDeleted(state, action) {
        return {
            ...state,
            isOrderDeleted: false
        }
    },
    clearOrderUpdated(state, action) {
        return {
            ...state,
            isOrderUpdated: false
        }
    }

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
  orderDetailsFail,
  orderDetailsRequest,
  orderDetailsSuccess,
  adminOrdersFail,
  adminOrdersRequest,
  adminOrdersSuccess,
  deleteOrderRequest,
  deleteOrderSuccess,
  deleteOrderFail,
  updateOrderRequest,
  updateOrderSuccess,
  updateOrderFail,
  clearOrderDeleted,
  clearOrderUpdated
} = actions;
export default reducer;
