import axios from "axios";
import { createOrderFail, createOrderRequest, createOrderSuccess, getUserOrdersFail, getUserOrdersRequest, getUserOrdersSuccess } from "../slices/orderSlice";

const apiurl = import.meta.env.VITE_APIURL; // to import .env ile
console.log(apiurl);


export const createOrder = orderDetails => async(dispatch)=>{
    try {
        dispatch(createOrderRequest())
        const {data} = await axios.post(`${apiurl}/api/v1/order/new`, orderDetails, {withCredentials: true})
        dispatch(createOrderSuccess(data))
        console.log(data);
        
    } catch (error) {
        dispatch(createOrderFail(error.response.data.message))
    }
}

export const getuserOrders = async(dispatch)=>{
    try {
        dispatch(getUserOrdersRequest())
        const {data} = await axios.get(`${apiurl}/api/v1/myorders`, {withCredentials: true})
        dispatch(getUserOrdersSuccess(data))
        console.log(data);
        
    } catch (error) {
        dispatch(getUserOrdersFail(error.message))
    }
}
