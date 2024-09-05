import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    loading: false,
    products: [],
  },

  reducers: {
    productsRequest(state, action) {
      return {
        loading: true,
      };
    },
    productsSuccess(state, action) {
      return {
        loading: false,
        products: action.payload.products,
        totalPoductsCount: action.payload.count,
        resPerPage: action.payload.resPerPage,
      };
    },
    productsFail(state, action) {
      return {
        loading: false,
        error: action.payload,
      };
    },
    getAdminProductsRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    getAdminProductsSuccess(state, action) {
        
      return {
        ...state,
        loading: false,
        products: action.payload.products
        
      };
    },
    getadminProductsFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
  },
});

const { actions, reducer } = productsSlice;

export const {
  productsRequest,
  productsSuccess,
  productsFail,
  getAdminProductsRequest,
  getAdminProductsSuccess,
  getadminProductsFail,
} = actions;
export default reducer;
