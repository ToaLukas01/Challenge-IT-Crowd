
const initialState = {
    allProducts: [],
    allBrands: [],
    auxiliarProducts: [],
    productsDetail: []
};

const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case "GET_ALL_PRODUCTS": return {
            ...state,
            allProducts: action.payload,
            auxiliarProducts: action.payload
        };
        
        case "GET_PRODUCT_ID": return {
            ...state,
            productsDetail: action.payload
        };
        
        case "CLEARID": return {
            ...state,
            productsDetail: []
        };

        case "POST_PRODUCT": return {
            ...state
        };
        
        case "DELETE_PRODUCT": return {
            ...state
        };

        case "UPDATE_PRODUCT": return {
            ...state
        };
        
        case "GET_BRANDS": return {
            ...state,
            allBrands: action.payload
        };

        case "POST_BRAND": return {
            ...state
        };

       default: return {...state};
    };
};

export default rootReducer;