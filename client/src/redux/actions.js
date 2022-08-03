
import axios from "axios";

export const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";

export const getAllRecipes = () => {
    return async function (dispatch) {
        try {
            const products = await axios.get("http://localhost:3001/products")
            console.log(products.data)
            return dispatch({
                type: GET_ALL_PRODUCTS,
                payload: products.data
            })
        }catch(err){
            console.log(err)
        }
    };       
};