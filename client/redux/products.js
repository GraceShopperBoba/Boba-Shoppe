import axios from "axios";

// ACTION TYPE
const SET_PRODUCTS = "SET_PRODUCTS";
const DELETE_PRODUCT = "DELETE_PRODUCT";
const CREATE_PRODUCT = "CREATE_PRODUCT";

// ACTION CREATOR
const setProducts = (products) => {
  return {
    type: SET_PRODUCTS,
    products,
  };
};

const deleteProduct = (product) => {
  return {
    type: DELETE_PRODUCT,
    product,
  };
};

const createProduct = (product) => {
  return {
    type: CREATE_PRODUCT,
    product,
  };
};

// THUNK CREATOR
export const fetchProducts = (category) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/products?category=${category}`);
      dispatch(setProducts(data));
    } catch (error) {
      return error;
    }
  };
};

export const fetchDeletedProduct = (id, history) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(`/api/products/${id}`);
      dispatch(deleteProduct(data));
      //history.push("/products");
    } catch (error) {
      return error;
    }
  };
};

export const fetchCreatedProduct = (product, history) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post("/api/products", product);
      dispatch(createProduct(data));
      history.push("/products");
    } catch (error) {
      return error;
    }
  };
};

// REDUCER
export default function productsReducer(state = [], action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products;
    case DELETE_PRODUCT:
      return state.filter((product) => product.id !== action.product.id);
    case CREATE_PRODUCT:
      return [...state, action.product];
    default:
      return state;
  }
}
