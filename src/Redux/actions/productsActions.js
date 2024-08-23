import axios from "axios"
import { productsFail, productsRequest, productsSuccess } from "../slices/productsSlice"

export const getProducts = (keyword,price,category,ratings,currentPage)=> async(dispatch)=>{

    try {
        dispatch(productsRequest())
        let url =`http://localhost:8000/api/v1/products?page=${currentPage}`

        if(keyword){
            // url = `http://localhost:8000/api/v1/products?keyword=${keyword}&page=${currentPage}`
            url += `&keyword=${keyword}`
        }
      
        if(price){
            // url = `http://localhost:8000/api/v1/products?keyword=${keyword}&price[gte]=${price[0]}&price[lte]=${price[1]}&page=${currentPage}`
            url += `&price[gte]=${price[0]}&price[lte]=${price[1]}`

        }

        if(category){
            // url = `http://localhost:8000/api/v1/products?category=${category}&page=${currentPage}`
            url += `&category=${category}`
        }

        if(ratings){
             url += `&ratings=${ratings}` 
        }
       


        const {data}= await axios.get(url)  
        // console.log(data);
        dispatch(productsSuccess(data))

    } catch (error) {
        console.log(error)
        dispatch(productsFail(error.message))  

        
    }

}

