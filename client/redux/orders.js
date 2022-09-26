import axios from "axios";

// ACTION TYPE
const SET_ORDERS = "SET_ORDERS";
const SET_ORDER = "SET_ORDER";

// ACTION CREATOR
const setOrders = (orders) => {
  return {
    type: SET_ORDERS,
    orders,
  };
};

export const setOrder = (order) => {
  return {
    type: SET_ORDER,
    order,
  };
};

// THUNK CREATOR
export const fetchOrdersByUser = (userId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/orders/user/${userId}`);
      dispatch(setOrders(data));
    } catch (error) {
      console.log(error);
    }
  };
};

// THUNK CREATOR
export const fetchOrder = (orderId) => {
  return async (dispatch) => {
    try {
      const { data: order } = await axios.get(`/api/orders/${orderId}`);
      dispatch(setOrder(order));
    } catch (error) {
      console.log(error);
    }
  };
};

// REDUCER
export default function ordersReducer(state = [], action) {
  switch (action.type) {
    case SET_ORDER:
      return action.order;
    case SET_ORDERS:
      return action.orders;
    default:
      return state;
  }
}
