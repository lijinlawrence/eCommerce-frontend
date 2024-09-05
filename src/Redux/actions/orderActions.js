import axios from "axios";
import {
  adminOrdersFail,
  adminOrdersRequest,
  adminOrdersSuccess,
  createOrderFail,
  createOrderRequest,
  createOrderSuccess,
  deleteOrderFail,
  deleteOrderRequest,
  deleteOrderSuccess,
  getUserOrdersFail,
  getUserOrdersRequest,
  getUserOrdersSuccess,
  orderDetailsFail,
  orderDetailsRequest,
  orderDetailsSuccess,
  updateOrderFail,
  updateOrderRequest,
  updateOrderSuccess,
} from "../slices/orderSlice";

const apiurl = import.meta.env.VITE_APIURL; // to import .env ile
console.log(apiurl);

export const createOrder = (orderDetails) => async (dispatch) => {
  try {
    dispatch(createOrderRequest());
    const { data } = await axios.post(
      `${apiurl}/api/v1/order/new`,
      orderDetails,
      { withCredentials: true }
    );
    dispatch(createOrderSuccess(data));
    console.log(data);
  } catch (error) {
    dispatch(createOrderFail(error.response.data.message));
  }
};

export const getuserOrders = async (dispatch) => {
  try {
    dispatch(getUserOrdersRequest());
    const { data } = await axios.get(`${apiurl}/api/v1/myorders`, {
      withCredentials: true,
    });
    dispatch(getUserOrdersSuccess(data));
    // console.log(data);
  } catch (error) {
    dispatch(getUserOrdersFail(error.message));
  }
};

export const getOrderDetails = (id) => async (dispatch) => {
    try {
      dispatch(orderDetailsRequest());
      const { data } = await axios.get(`${apiurl}/api/v1/order/${id}`, {
        withCredentials: true,
      });
      // console.log("Order details fetched successfully:", data); // Add this log
      dispatch(orderDetailsSuccess(data));
    } catch (error) {
      console.error("Error fetching order details:", error.response?.data?.message || error.message); // Update error log
      dispatch(orderDetailsFail(error.response?.data?.message || "Something went wrong"));
    }
  };;

  export const adminOrdersAction = async(dispatch) => {
    try {
       dispatch(adminOrdersRequest())
       const {data} = await axios.get(`${apiurl}/api/v1/admin/orders`,{withCredentials: true})
       dispatch(adminOrdersSuccess(data))
       console.log(data);
       
    } catch (error) {
        dispatch(adminOrdersFail(error.response.data.message))
        console.log(error.response?.data?.message);
    }
}

export const adminDeleteOrder = id => async(dispatch) => {
    try {
       dispatch(deleteOrderRequest())
       await axios.delete(`${apiurl}/api/v1/admin/order/${id}`,{
          withCredentials: true
       })
       dispatch(deleteOrderSuccess())
    } catch (error) {
       dispatch(deleteOrderFail(error.response.data.message))
    }
}

export const adminUpdateOrder = (id, orderData)  => async(dispatch) => {
    try {
       dispatch(updateOrderRequest())
       const { data} = await axios.put(`${apiurl}/api/v1/admin/order/${id}`, orderData,
       {withCredentials: true}
       )
       dispatch(updateOrderSuccess(data))
    } catch (error) {
       dispatch(updateOrderFail(error.response?.data?.message))
    }
}
