
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
        
       default: return {...state};
    };
};

export default rootReducer;