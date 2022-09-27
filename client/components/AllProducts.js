import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchDeletedProduct, fetchProducts } from "../redux/products";
import {
  createOrderProductThunk,
  getOrderProductThunk,
} from "../redux/orderProducts";
import { me } from "../store/auth";
import Category from "./Category";

export class AllProducts extends React.Component {
  constructor(props) {
    super(props);
    this.addToCart = this.addToCart.bind(this);
  }

  addToCart(productId, orderId) {
    console.log(productId, orderId);
    this.props.createOrderProduct({ productId, orderId });
  }

  componentDidMount() {
    let category = this.props.match.params.category
      ? this.props.match.params.category
      : "";
    this.props.getProducts(category);
    this.props.currentUserData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.category !== prevProps.match.params.category) {
      let category = this.props.match.params.category
        ? this.props.match.params.category
        : "";
      this.props.getProducts(category);
      this.props.currentUserData();
    }
  }

  render() {
    const products = this.props.products || [];
    const isAdmin = this.props.isAdmin;
    const user = this.props.user;
    return isAdmin ? (
      <div>
        <Category />
        <div id="allItems">
          <div className="itemContainer">
            {products.length
              ? products.map((product) => {
                  return (
                    <div id="singleItem" key={product.id}>
                      <div className="productDisplayCard">
                        <Link to={`/product/${product.id}`}>
                          <img src={product.imageUrl} alt="image" />
                          <h2>{product.name}</h2>
                          <h3>${(product.price / 100).toFixed(2)}</h3>
                          <button>Edit</button>
                        </Link>
                        <button
                          onClick={() => this.props.deleteProduct(product.id)}
                          type="submit"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                })
              : null}
          </div>
        </div>
      </div>
    ) : (
      <div>
        <Category />
        <div id="allItems">
          <div className="itemContainer">
            {products.length
              ? products.map((product) => {
                  return (
                    <div id="singleItem" key={product.id}>
                      <div className="productDisplayCard">
                        <Link to={`/product/${product.id}`}>
                          <img src={product.imageUrl} alt="image" />
                          <h2>{product.name}</h2>
                          <h3>${(product.price / 100).toFixed(2)}</h3>
                        </Link>
                        <div className="likeArea">
                          <button
                            className="add"
                            onClick={() => {
                              this.addToCart(product.id, user.currentOrder);
                            }}
                          >
                            Add to Cart
                          </button>
                          <button className="like">
                            <span>♥</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              : null}
          </div>
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    products: state.products,
    isAdmin: state.auth.adminAccess,
    user: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getProducts: (category) => dispatch(fetchProducts(category)),
  getOrderProducts: (order) => dispatch(getOrderProductThunk(order)),
  currentUserData() {
    dispatch(me());
  },
  deleteProduct: (id) => dispatch(fetchDeletedProduct(id)),
  createOrderProduct: (order) => dispatch(createOrderProductThunk(order)),
});

export default connect(mapState, mapDispatchToProps)(AllProducts);
