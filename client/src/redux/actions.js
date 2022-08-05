
import axios from "axios";

export const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";
export const GET_PRODUCT_ID = "GET_PRODUCT_ID";
export const CLEARID = "CLEARID";
export const POST_PRODUCT = "POST_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const GET_BRANDS = "GET_BRANDS";
export const POST_BRAND = "POST_BRAND";

export const getAllProducts = () => {
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

export const getProductID = (id) => {
    return async function (dispatch) {
        try {
            var product = await axios.get(`http://localhost:3001/products?id=${id}`)
            return dispatch({
                type: GET_PRODUCT_ID,
                payload: product.data
            })
        }catch(err){
            console.log(err)
        }
    };
};

export const clearID  =()=>{
    return {
        type: CLEARID
    };
};

export const postProduct = (atributos) => {
    return async function (dispatch) {
        var post = await axios.post('http://localhost:3001/products', atributos);
        return post;
    }
};

export const deleteProduct = (id) => {
    return async function (dispatch) {
        try {
            await axios.delete(`http://localhost:3001/products?id=${id}`);
            return dispatch({
                type: DELETE_PRODUCT,
                payload: id
            })
        }catch(err){
            console.log(err)
        }
    };
};

export const getBrands = () => {
    return async function (dispatch) {
        try {
            var brands = await axios.get("http://localhost:3001/brands")
            return dispatch({
                type: GET_BRANDS,
                payload: brands.data
            })
        }catch(err){
            console.log(err)
        }
    };
};

export const postBrands = (atributos) => {
    return async function (dispatch) {
        var post = await axios.post('http://localhost:3001/brands', atributos);
        return post;
    }
};

