import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchOrdersByUser } from "../redux/orders";
import { deleteOrderProductThunk } from "../redux/orderProducts";
import { Link } from "react-router-dom";

export function Cart(props) {
  const [productsInCart, setProductsInCart] = useState("");

  useEffect(() => {
    props.getOrders(props.user.id);
  }, []);

  let { orders } = props || [];
  let products = orders?.products || [];
  let { user } = props;

  return (
    <div className="cart">
      <h1>{user.firstName}'s Shopping Bag</h1>
      <hr />
      <div className="cartInfo">
        <div className="productsInCart">
          {products
            ? products.map((product) => {
                return (
                  <div key={product.id}>
                    <div className="product">
                      <img src={product.imageUrl} alt="image" />
                      <div className="productInfo">
                        <h2> {product.name}</h2>
                      </div>
                      <div className="price">
                        <h3>Item Price: {product.price}</h3>
                      </div>
                      <select name="quantity" className="quantSelector">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                      </select>
                      <div className="price">
                        <h3>Total Price: {product.price}</h3>
                        <h5
                          className="remove"
                          onClick={(e) => {
                            setProductsInCart(e.target.value);
                            let thunkInfo = [];
                            thunkInfo.push(orders.id);
                            thunkInfo.push(product.id);
                            this.props.deleteOrderProduct(thunkInfo);
                            window.location.reload(false);
                          }}
                        >
                          Remove
                        </h5>
                      </div>
                    </div>
                    <hr />
                  </div>
                );
              })
            : null}
        </div>
        <div className="orderSummary">
          <h2>Order Summmary</h2>
          <h3>TOTAL</h3>
          <Link to="/checkout">
            <button className="checkout">Proceed To Checkout</button>
          </Link>
        </div>
      </div>
      <div />
    </div>
  );
}

const mapState = (state) => {
  return {
    user: state.auth,
    orders: state.orders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getOrders: (userId) => dispatch(fetchOrdersByUser(userId)),
    deleteOrderProduct: (thunkInfo) =>
      dispatch(deleteOrderProductThunk(thunkInfo)),
  };
};

export default connect(mapState, mapDispatchToProps)(Cart);
