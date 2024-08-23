import axios from "axios"
import { productFail, productRequest, productSuccess } from "../slices/productSlice"

export const getProduct = id=> async(dispatch)=>{

    try {
        dispatch(productRequest())
        const {data}= await axios.get(`http://localhost:8000/api/v1/product/${id}`)  
        // console.log(data);
        dispatch(productSuccess(data))

    } catch (error) {
        console.log(error)
        dispatch(productFail(error.response.data.message))  

        
    }

}
