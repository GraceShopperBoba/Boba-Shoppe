import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchDeletedProduct, fetchProducts } from "../redux/products";
import { me } from "../store/auth";
import CreateProduct from "./CreateProduct";
import Category from "./Category";

export class AllProducts extends React.Component {
  constructor(props) {
    super(props);
    this.addToCart = this.addToCart.bind(this);
    this.confirmation = this.confirmation.bind(this);
  }

  addToCart() {
    console.log("hi");
  }

  componentDidMount() {
    console.log("LOG: ", this.props.match.params.category);
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

  confirmation(productId) {
    const result = confirm("Are you sure you want to delete this product?");
    if (result) {
      this.props.deleteProduct(productId);
    }
  }

  render() {
    const products = this.props.products || [];
    const isAdmin = this.props.isAdmin;

    return isAdmin ? (
      <div id="allItems">
        <Category />
        <div className="itemContainer">
          {products.length
            ? products.map((product) => {
                return (
                  <div id="singleItem" key={product.id}>
                    <div className="productDisplayCard">
                      <Link to={`/products/${product.id}`}>
                        <img src={product.imageUrl} alt="image" />
                        <h2>{product.name}</h2>
                        <h3>${product.price}</h3>
                        <button>Edit</button>
                      </Link>
                      <button
                        onClick={() => {
                          this.confirmation(product.id);
                        }}
                        type="submit"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })
            : null}
          <CreateProduct />
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
                          <h3>{product.price}</h3>
                          <div className="likeArea">
                            <button className="add" onClick={this.addToCart}>
                              Add to Cart
                            </button>
                            <button className="like">
                              <span>♥</span>
                            </button>
                          </div>
                        </Link>
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
  };
};

const mapDispatchToProps = (dispatch) => ({
  getProducts: (category) => dispatch(fetchProducts(category)),
  currentUserData() {
    dispatch(me());
  },
  deleteProduct: (id) => dispatch(fetchDeletedProduct(id)),
});

export default connect(mapState, mapDispatchToProps)(AllProducts);
