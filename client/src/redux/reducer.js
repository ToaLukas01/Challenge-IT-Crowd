
const initialState = {
    allProducts: [],
    Brands: [],
    productsDetail: [],
};

const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case "GET_ALL_PRODUCTS": return {
            ...state,
            allProducts: action.payload,
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
            ...state,
            allProducts: state.allProducts.filter(p => p.id !== action.payload)
        };

        case "UPDATE_PRODUCT": return {
            ...state,
            allProducts: state.allProducts.map((p) => {
                return p.id === action.payload.id ? action.payload : p;
              }),
        };

        case "GET_BRANDS": return {
            ...state,
            Brands: action.payload
        };

        case "POST_BRAND": return {
            ...state
        };

       default: return {...state};
    };
};

export default rootReducer;