import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchDeletedProduct, fetchProducts } from "../redux/products";
import { me } from "../store/auth";

export class AllProducts extends React.Component {
  constructor(props) {
    super(props);

    this.addToCart = this.addToCart.bind(this);
  }

  addToCart() {
    console.log("hi");
  }
  componentDidMount() {
    this.props.getProducts();
    this.props.currentUserData();
  }

  render() {
    const products = this.props.products || [];
    const isAdmin = this.props.isAdmin;

    return isAdmin ? (
      <div id="allItems">
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
                      <button onClick={this.addToCart} type="submit">
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })
            : null}
        </div>
      </div>
    ) : (
      <div id="allItems">
        <div className="itemContainer">
          {products.length
            ? products.map((product) => {
                return (
                  <div id="singleItem" key={product.id}>
                    <div className="productDisplayCard">
                      <Link to={`/products/${product.id}`}>
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
  getProducts: () => dispatch(fetchProducts()),
  currentUserData() {
    dispatch(me());
  },
  deleteProduct: (id) => dispatch(fetchDeletedProduct(id)),
});

export default connect(mapState, mapDispatchToProps)(AllProducts);
