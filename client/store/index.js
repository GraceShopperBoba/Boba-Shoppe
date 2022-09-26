import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import auth from "./auth";
import products from "../redux/products";
import product from "../redux/singleProduct";
import orderProducts from "../redux/orderProducts";
import orders from "../redux/orders";
import users from "../redux/users";
import user from "../redux/user";

const reducer = combineReducers({
  auth,
  products,
  product,
  users,
  user,
  orders,
  orderProducts,
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from "./auth";
