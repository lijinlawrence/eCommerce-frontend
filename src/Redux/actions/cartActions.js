import axios from "axios"
import { addCartItemsRequest, addCartItemsSuccess } from "../slices/cartSlice"



const apiurl = import.meta.env.VITE_APIURL; // to import .env ile
console.log(apiurl);

export const addCartItem =(id,quantity)=> async(dispatch)=>{
 try {
    dispatch(addCartItemsRequest())
    const {data}= await axios.get(`${apiurl}/api/v1/product/${id}`)
    console.log(data);
    
    dispatch(addCartItemsSuccess({
        productId: data.product._id,
        name: data.product.name,
        price: data.product.price,
        image: data.product.images[0].image,
        stock: data.product.stock,
        quantity
    }))
 } catch (error) {
    
 }
}