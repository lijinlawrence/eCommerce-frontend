import axios from "axios";
import {
  createReviewFail,
  createReviewSuccess,
  deleteProductFail,
  deleteProductRequested,
  deleteProductSuccess,
  deleteReviewFail,
  deleteReviewRequest,
  deleteReviewSuccess,
  newProductFail,
  newProductRequested,
  newProductSuccess,
  productFail,
  productRequest,
  productSuccess,
  reviewsFail,
  reviewsRequest,
  reviewsSuccess,
  updateProductFail,
  updateProductRequested,
  updateProductSuccess,
} from "../slices/productSlice";

const apiurl = import.meta.env.VITE_APIURL; // to import .env ile
console.log(apiurl);

export const getProduct = (id) => async (dispatch) => {
  try {
    dispatch(productRequest());
    const { data } = await axios.get(`${apiurl}/api/v1/product/${id}`);
    // console.log(data);
    dispatch(productSuccess(data));
    
  } catch (error) {
    console.log(error);
    dispatch(productFail(error.response?.data?.message));
  }
};

export const createReview = (reviewData) => async (dispatch) => {
  try {
    dispatch(createReviewFail());
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true, // Include credentials
    };
    const { data } =await  axios.put(`${apiurl}/api/v1/review`, reviewData, config);
    dispatch(createReviewSuccess(data));
  } catch (error) {
    dispatch(createReviewFail(error.response?.data?.message));
    console.log(error.response?.data?.message);
  }
};

export const createNewProduct = productData =>async(dispatch)=>{

  try {
    dispatch(newProductRequested())
    const {data}= await axios.post(`${apiurl}/api/v1/products/new`,productData,{
      withCredentials:true
    })
    console.log(data);
    dispatch(newProductSuccess(data))
    
  } catch (error) {
    dispatch(newProductFail(error.response?.data?.message))
    console.log(error.response?.data?.message);
    
  }
}

export const deleteProduct =(id)=>async(dispatch)=>{
   
  try {
    dispatch(deleteProductRequested())
    const {data}= await axios.delete(`${apiurl}/api/v1/admin/product/delete/${id}`,
      {withCredentials:true}
    )
    dispatch(deleteProductSuccess())
    
  } catch (error) {
    dispatch(deleteProductFail(error.response?.data?.message))
    console.log(error.response?.data?.message);
  }
}


export const updateProduct = (id,productData)=>async(dispatch)=>{
  try {
    dispatch(updateProductRequested())
    const {data}=await axios.put(`${apiurl}/api/v1/admin/product/update/${id}`,productData,
      {withCredentials:true}
    )
    dispatch(updateProductSuccess(data))
    console.log(data);
    
  } catch (error) {
    dispatch(updateProductFail(error.response?.data?.message))
    console.log(error.response?.data?.message);
  }
}

export const getReviews =  id => async (dispatch) => {

  try {  
      dispatch(reviewsRequest()) 
      const { data }  =  await axios.get(`${apiurl}/api/v1/admin/reviews`,{params: {id},
      withCredentials:true}
      ); // tiaccess query parameter
      dispatch(reviewsSuccess(data))
  } catch (error) {
      //handle error
      dispatch(reviewsFail(error.response.data.message))
  }
  
}

export const deleteReview =  (productId, id) => async (dispatch) => {

  try {  
      dispatch(deleteReviewRequest()) 
      await axios.delete(`${apiurl}/api/v1/admin/review`,{params: {productId, id},
      withCredentials:true}
      );
      dispatch(deleteReviewSuccess())
  } catch (error) {
      //handle error
      dispatch(deleteReviewFail(error.response.data.message))
  }
  
}
