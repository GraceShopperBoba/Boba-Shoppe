import axios from "axios";

// ACTION TYPE
const DELETE_ORDER_PRODUCT = "DELETE_ORDER_PRODUCT";

// ACTION CREATOR
export const deleteOrderProduct = (order) => {
  return {
    type: DELETE_ORDER_PRODUCT,
    order,
  };
};

// THUNK CREATOR
export const deleteOrderProductThunk = (thunkInfo) => {
  let orderId = thunkInfo[0];
  let productId = thunkInfo[1];
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(
        `/api/ordersProducts/${orderId}/${productId}`
      );
      dispatch(deleteOrderProduct(data));
    } catch (error) {
      console.log(error);
    }
  };
};

// REDUCER
export default function orderProductsReducer(state = [], action) {
  switch (action.type) {
    case DELETE_ORDER_PRODUCT:
      return state.filter((order) => order.id !== action.order.id);
    default:
      return state;
  }
}
