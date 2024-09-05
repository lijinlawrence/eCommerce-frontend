import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    loading: false,
    product: {},
    error: null,
    isReviewed: false,
    isProductCreated: false,
    isProductDeleted: false,
    isProductUpdated: false,
    isReviewDeleted: false,
    reviews: [],
  },

  reducers: {
    productRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    productSuccess(state, action) {
      return {
        ...state,
        loading: false,
        product: action.payload.product,
      };
    },
    productFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    createReviewRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    createReviewSuccess(state, action) {
      return {
        ...state,
        loading: false,
        isReviewed: true,
      };
    },
    createReviewFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    clearIsReviewed(state, action) {
      return {
        ...state,
        loading: false,
        isReviewed: false,
      };
    },
    clearError(state, action) {
      return { ...state, error: null };
    },
    clearProduct(state, action) {
      return { ...state, product: {} };
    },
    newProductRequested(state, action) {
      return {
        ...state,
        loading: false,
      };
    },
    newProductSuccess(state, action) {
      return {
        ...state,
        loading: false,
        product: action.payload.product,
        isProductCreated: true,
      };
    },
    newProductFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    clearProductCreated(state, action) {
      return {
        ...state,
        isProductCreated: false,
      };
    },
    deleteProductRequested(state, action) {
      return {
        ...state,
        loading: false,
      };
    },
    deleteProductSuccess(state, action) {
      return {
        ...state,
        loading: false,
        isProductDeleted: true,
      };
    },
    deleteProductFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    clearProductdeleted(state, action) {
      return {
        ...state,
        isProductDeleted: false,
      };
    },
    updateProductRequested(state, action) {
      return {
        ...state,
        loading: false,
      };
    },
    updateProductSuccess(state, action) {
      return {
        ...state,
        loading: false,
        product: action.payload.updatedProduct,
        isProductUpdated: true,
      };
    },
    updateProductFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    clearProductupdated(state, action) {
      return {
        ...state,
        isProductUpdated: false,
      };
    },
    reviewsRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    reviewsSuccess(state, action) {
      return {
        ...state,
        loading: false,
        reviews: action.payload.reviews,
      };
    },
    reviewsFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    deleteReviewRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    deleteReviewSuccess(state, action) {
      return {
        ...state,
        loading: false,
        isReviewDeleted: true,
      };
    },
    deleteReviewFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    clearReviewDeleted(state, action) {
      return {
        ...state,
        isReviewDeleted: false,
      };
    },
  },
});

const { actions, reducer } = productSlice;

export const {
  productRequest,
  productSuccess,
  productFail,
  createReviewFail,
  createReviewSuccess,
  createReviewRequest,
  clearIsReviewed,
  clearError,
  clearProduct,
  newProductRequested,
  newProductSuccess,
  newProductFail,
  clearProductCreated,
  deleteProductRequested,
  deleteProductSuccess,
  deleteProductFail,
  clearProductdeleted,
  updateProductRequested,
  updateProductSuccess,
  updateProductFail,
  clearProductupdated,
  reviewsFail,
  reviewsSuccess,
  reviewsRequest,
  deleteReviewRequest,
  deleteReviewSuccess,
  deleteReviewFail,
  clearReviewDeleted,
} = actions;
export default reducer;
