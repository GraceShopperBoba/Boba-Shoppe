import axios from "axios";
import { emptyQuery } from "pg-protocol/dist/messages";

// ACTION TYPE
const DELETE_ORDER_PRODUCT = "DELETE_ORDER_PRODUCT";
const CREATE_ORDER_PRODUCT = "CREATE_ORDER_PRODUCT";
const GET_ORDER_PRODUCT = "GET_ORDER_PRODUCT";
const UPDATE_ORDER_PRODUCT = "UPDATE_ORDER_PRODUCT";

// ACTION CREATOR
export const deleteOrderProduct = (order) => {
  return {
    type: DELETE_ORDER_PRODUCT,
    order,
  };
};

export const createOrderProduct = (order) => {
  return {
    type: CREATE_ORDER_PRODUCT,
    order,
  };
};

export const getOrderProduct = (order) => {
  return {
    type: GET_ORDER_PRODUCT,
    order,
  };
};

export const updateOrder = (order) => {
  return { type: UPDATE_ORDER_PRODUCT, order };
};

// THUNK CREATOR
export const deleteOrderProductThunk = (thunkInfo) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(
        `/api/ordersProducts/${thunkInfo.orderId}/${thunkInfo.productId}`
      );
      dispatch(deleteOrderProduct(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const createOrderProductThunk = (order) => {
  console.log("in thunk");
  console.log(order);
  return async (dispatch) => {
    try {
      const { data: doesItExist } = await axios.get(
        `/api/ordersProducts/${order.orderId}/${order.productId}`
      );
      console.log("does it exist", doesItExist);
      if (!doesItExist) {
        const { data: created } = await axios.post(
          `/api/ordersProducts`,
          order
        );
        dispatch(createOrderProduct(created));
      } else {
        doesItExist.quantity++;
        const { data: update } = await axios.put(
          `/api/ordersProducts/${order.orderId}/${order.productId}`,
          doesItExist
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getOrderProductThunk = (orderInfo) => {
  return async (dispatch) => {
    try {
      const { data: created } = await axios.get(
        `/api/ordersProducts/${orderInfo.orderId}/${orderInfo.productId}`
      );
      dispatch(createOrderProduct(created));
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateOrderProductThunk = (orderInfo) => {
  return async (dispatch) => {
    try {
      console.log(orderInfo);
      const { data: update } = await axios.put(
        `/api/ordersProducts/${orderInfo.orderId}/${orderInfo.productId}`,
        orderInfo
      );
      dispatch(updateOrder(update));
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
    case CREATE_ORDER_PRODUCT:
      return [...state, action.order];
    case GET_ORDER_PRODUCT:
      return action.order;
    case UPDATE_ORDER_PRODUCT:
      return state.map((order) =>
        order.id === action.order.id ? action.order : order
      );
    default:
      return state;
  }
}
