import axios from "axios";
import {
  clearError,
  forgetPasswordFail,
  forgetPasswordRequest,
  forgetPasswordSuccess,
  loadUserFail,
  loadUserSuccess,
  loginFail,
  loginRequest,
  loginSuccess,
  logoutFail,
  logoutSuccess,
  registerFail,
  registerRequest,
  registerSuccess,
  updateProfileFail,
  updateProfilePasswordFail,
  updateProfilePasswordRequest,
  updateProfilePasswordSuccess,
  updateProfileRequest,
  updateProfileSuccess,
} from "../slices/authSlice";

const apiurl = import.meta.env.VITE_APIURL; // to import .env ile
console.log(apiurl);

// Login Ations
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(loginRequest());
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true, // Include credentials
    };
    const { data } = await axios.post(
      `${apiurl}/api/v1/login`,
      {
        email,
        password,
      },
      config
    );

    dispatch(loginSuccess(data));
  } catch (error) {
    dispatch(loginFail(error.response.data.message));
    console.log(error.response.data.message);
  }
};

// export const clearAuthError = (dispatch)=>{
//   dispatch(clearError())
// }

// register Actions

export const register = (userData) => async (dispatch) => {
  try {
    dispatch(registerRequest());

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true, // Include credentials
    };

    const { data } = await axios.post(
      `${apiurl}/api/v1/register`,
      userData,
      config
    );

    dispatch(registerSuccess(data));
  } catch (error) {
    dispatch(registerFail(error.response.data.message));
    console.log(error.response.data.message);
  }
};

// Load User Data
export const loadUser = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${apiurl}/api/v1/myprofile`, {
      withCredentials: true, // Include credentials it means cookies
    });
    dispatch(loadUserSuccess(data));
  } catch (error) {
    dispatch(
      loadUserFail(error.response.data.message || "Failed to load user")
    );
    console.log(error.response.data.message || error.message);
  }
};

// Logout
export const logout = () => async (dispatch) => {
  try {
    await axios.get(`${apiurl}/api/v1/logout`, { withCredentials: true });
    dispatch(logoutSuccess());
  } catch (error) {
    dispatch(logoutFail(error.response?.data?.message || "Logout failed"));
    console.log(error.response?.data?.message || error.message);
  }
};

// update profile Actions

export const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch(updateProfileRequest());

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true, // Include credentials
    };

    const { data } = await axios.put(
      `${apiurl}/api/v1/myprofile/update`,
      userData,
      config
    );

    dispatch(updateProfileSuccess(data));
  } catch (error) {
    dispatch(updateProfileFail(error.response.data.message));
    console.log(error.response.data.message);
  }
};


// update Profile Password

export const changePassword = (userData) => async (dispatch) => {
  try {
    dispatch(updateProfilePasswordRequest());

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true, // Include credentials
    };

    const { data } = await axios.put(
      `${apiurl}/api/v1/password/change`,
      userData,
      config
    );

    dispatch(updateProfilePasswordSuccess(data));
  } catch (error) {
    dispatch(updateProfilePasswordFail(error.response.data.message));
    console.log(error.response.data.message);
  }
};

// forget Password

export const forgetPassword = (formData) => async (dispatch) => {
  try {
    dispatch(forgetPasswordRequest());

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${apiurl}/api/v1/password/forget`,
      formData,
      config
    );

    dispatch(forgetPasswordSuccess(data));
  } catch (error) {
    dispatch(forgetPasswordFail(error.response.data.message));
    console.log(error.response.data.message);
  }
};
