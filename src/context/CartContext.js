import axios from "axios";
import { createContext } from "react";

export let CartContext = createContext();

export default function CartContextProvider(props){
    function addToCart(productId){
        return axios.post(`https://route-ecommerce.onrender.com//api/v1/products`, {
            productid
    }, {
         headers:
    })
        .then((Response)=> response)
        .catch((err)=> err)
    }
}