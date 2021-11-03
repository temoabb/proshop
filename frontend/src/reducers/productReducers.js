import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL } from '../constants/productConstants';

const initState = {
  products: [],
};

export const productListReducer = (state = initState, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return {
        products: [],
        loading: true,
      }
    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      }
    case PRODUCT_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
        // products: []
      }
    default:
      return state;
  }
};