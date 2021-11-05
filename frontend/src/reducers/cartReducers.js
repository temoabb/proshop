import * as cartConstants from '../constants/cartConstants';

const initState = {
  cartItems: [],
};

export const cartReducer = (state = initState, action) => {
  switch (action.type) {

    case cartConstants.CART_ADD_ITEM:
      const item = action.payload;
      const existItem = state.cartItems.find(i => i.product === item.product);

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map(oldItem => oldItem.product === existItem.product ? item : oldItem)
        }
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        }
      }

    case cartConstants.CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.product !== action.payload),
      }

    default:
      return state;
  }
};


