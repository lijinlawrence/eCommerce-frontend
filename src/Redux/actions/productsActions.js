import axios from "axios";
import {
  getadminProductsFail,
  getAdminProductsRequest,
  getAdminProductsSuccess,
  productsFail,
  productsRequest,
  productsSuccess,
} from "../slices/productsSlice";

const apiurl = import.meta.env.VITE_APIURL; // to import .env ile
console.log(apiurl);
export const getProducts =
  (keyword, price, category, ratings, currentPage) => async (dispatch) => {
    try {
      dispatch(productsRequest());
      let url = `${apiurl}/api/v1/products?page=${currentPage}`;

      if (keyword) {
        // url = `http://localhost:8000/api/v1/products?keyword=${keyword}&page=${currentPage}`
        url += `&keyword=${keyword}`;
      }

      if (price) {
        // url = `http://localhost:8000/api/v1/products?keyword=${keyword}&price[gte]=${price[0]}&price[lte]=${price[1]}&page=${currentPage}`
        url += `&price[gte]=${price[0]}&price[lte]=${price[1]}`;
      }

      if (category) {
        // url = `http://localhost:8000/api/v1/products?category=${category}&page=${currentPage}`
        url += `&category=${category}`;
      }

      if (ratings) {
        url += `&ratings=${ratings}`;
      }

      const { data } = await axios.get(url);
      // console.log(data);
      dispatch(productsSuccess(data));
    } catch (error) {
      console.log(error);
      dispatch(productsFail(error.message));
    }
  };

export const getAdminProducts = async (dispatch) => {
  try {
    dispatch(getAdminProductsRequest());
    const { data } = await axios.get(`${apiurl}/api/v1/admin/products`, {
      withCredentials: true,
    });

    dispatch(getAdminProductsSuccess(data));
 
    
  } catch (error) {
    dispatch(getadminProductsFail(error.response?.data?.message));
    console.log(error.response?.data?.message);
  }
};
