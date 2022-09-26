import axios from "axios";

// ACTION TYPE
const DELETE_ORDER_PRODUCT = "DELETE_ORDER_PRODUCT";

// ACTION CREATOR
export const deleteOrderProduct = (order) => {
  console.log("in action creator");
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
      console.log("here");
      const { data } = await axios.delete(
        `/api/ordersProducts/${orderId}/${productId}`
      );
      console.log("data", data);
      dispatch(deleteOrderProduct(data));
    } catch (error) {
      console.log("UHGHHH");
      console.log(error);
    }
  };
};

// REDUCER
export default function orderProductsReducer(state = [], action) {
  console.log("in reducer");
  switch (action.type) {
    case DELETE_ORDER_PRODUCT:
      return state.filter((order) => order.id !== action.order.id);
    default:
      return state;
  }
}
