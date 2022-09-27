import React from "react";
import { connect } from "react-redux";
import { fetchOrdersByUser } from "../redux/orders";
import {
  deleteOrderProductThunk,
  getOrderProductThunk,
  updateOrderProductThunk,
} from "../redux/orderProducts";
import { Link } from "react-router-dom";

export class Cart extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getOrders(this.props.user.id);
  }

  render() {
    let { orders } = this.props || [];
    let products = orders?.products || [];
    let { user } = this.props;
    let overallTotal = 0;
    products.map((product) => {
      overallTotal += product.order_products.quantity * product.price;
    });

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
                          <h3>
                            Item Price: ${(product.price / 100).toFixed(2)}
                          </h3>
                        </div>
                        <div className="quantity">
                          <button
                            onClick={() => {
                              let quantity =
                                (product.order_products.quantity -= 1);
                              let orderId = orders.id;
                              let productId = product.id;
                              this.props.updateOrdersProduct({
                                quantity,
                                orderId,
                                productId,
                              });
                              window.location.reload(false);
                            }}
                          >
                            -
                          </button>
                          <h3>Quantity: {product.order_products.quantity}</h3>

                          <button
                            onClick={() => {
                              let quantity =
                                (product.order_products.quantity += 1);
                              let orderId = orders.id;
                              let productId = product.id;
                              this.props.updateOrdersProduct({
                                quantity,
                                orderId,
                                productId,
                              });
                              window.location.reload(true);
                            }}
                          >
                            +
                          </button>
                        </div>
                        <div className="price">
                          <h3>
                            Total Price: $
                            {(
                              (product.price *
                                product.order_products.quantity) /
                              100
                            ).toFixed(2)}
                          </h3>
                          <h5
                            className="remove"
                            onClick={() => {
                              let orderId = orders.id;
                              let productId = product.id;
                              this.props.deleteOrderProduct({
                                orderId,
                                productId,
                              });
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
            <h3>TOTAL: ${(overallTotal / 100).toFixed(2)} </h3>
            {("in total", console.log(this))}
            <Link to="/checkout">
              <button className="checkout">Proceed To Checkout</button>
            </Link>
          </div>
        </div>
        <div />
      </div>
    );
  }
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
    getOrdersProduct: (order) => dispatch(getOrderProductThunk(order)),
    updateOrdersProduct: (order) => dispatch(updateOrderProductThunk(order)),
  };
};

export default connect(mapState, mapDispatchToProps)(Cart);
