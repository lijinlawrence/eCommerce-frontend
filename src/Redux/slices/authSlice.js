import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: true,
    isAuthenticated: false,
    user: null,
    error: null,
  },
  reducers: {
    loginRequest(state) {
      return {
        ...state,
        loading: true,
      };
    },
    loginSuccess(state, action) {
      return {
        loading: false,
        user: action.payload.user,
        isAuthenticated: true,
      };
    },
    loginFail(state, action) {
      return {
        loading: false,
        isAuthenticated: false,
        error: action.payload,
      };
    },
    clearError(state, action) {
      return {
        ...state,
        error: null,
      };
    },

    registerRequest(state) {
      return {
        ...state,
        loading: true,
      };
    },
    registerSuccess(state, action) {
      return {
        loading: false,
        user: action.payload.user,
        isAuthenticated: true,
      };
    },
    registerFail(state, action) {
      return {
        loading: false,
        isAuthenticated: false,
        error: action.payload,
      };
    },
    loadUserRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    loadUserSuccess(state, action) {
      return {
        loading: false,
        user: action.payload.user,
        isAuthenticated: true,
      };
    },

    loadUserFail(state, action) {
      return {
        loading: false,
        isAuthenticated: false,
        error: null,
      };
    },
    logoutSuccess(state, action) {
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    },
    logoutFail(state, action) {
      return {
        ...state,
        error: action.payload,
      };
    },
    updateProfileRequest(state, action) {
      return {
        ...state,
        isUpdated: false,
        loading: true,
      };
    },
    updateProfileSuccess(state, action) {
      return {
        ...state,
        loading: false,
        isUpdated: true,
        user: action.payload.user,
      };
    },
    updateProfileFail(state, action) {
      return {
        ...state,
        loading: false,
        isUpdated: false,
        error: action.payload,
      };
    },
    updateProfilePasswordRequest(state, action) {
      return {
        ...state,
        isUpdated: false,
        loading: true,
      };
    },
    updateProfilePasswordSuccess(state, action) {
      return {
        ...state,
        loading: false,
        isUpdated: true,
      };
    },
    updateProfilePasswordFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    clearIsUpdated(state, action) {
      return {
        ...state,
        isUpdated: false,
      };
    },
    forgetPasswordRequest(state, action) {
      return {
        ...state,
        loading: true,
        message: null,
      };
    },
    forgetPasswordSuccess(state, action) {
      return {
        ...state,
        loading: false,
        message: action.payload.message,
      };
    },
    forgetPasswordFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    resetPasswordRequest(state, action) {
      return {
        ...state,
        isAuthenticated: false,
        loading: true,
      };
    },
    resetPasswordSuccess(state, action) {
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
      };
    },
    resetPasswordFail(state, action) {
      return {
        ...state,
        loading: false,
        isUpdated: false,
        error: action.payload,
      };
    },
  },
});

const { actions, reducer } = authSlice;

export const {
  loginRequest,
  loginSuccess,
  loginFail,
  clearError,
  registerRequest,
  registerSuccess,
  registerFail,
  loadUserRequest,
  loadUserSuccess,
  loadUserFail,
  logoutSuccess,
  logoutFail,
  updateProfileRequest,
  updateProfileSuccess,
  updateProfileFail,
  updateProfilePasswordRequest,
  updateProfilePasswordSuccess,
  updateProfilePasswordFail,
  clearIsUpdated,
  forgetPasswordRequest,
  forgetPasswordSuccess,
  forgetPasswordFail,
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFail,
} = actions;
export default reducer;
