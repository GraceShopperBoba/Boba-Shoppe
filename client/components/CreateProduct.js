import React from "react";
import { connect } from "react-redux";
import { fetchCreatedProduct } from "../redux/products";

export class CreateProduct extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      quantity: "",
      price: "",
      description: "",
      category: "",
      imageUrl: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.createProduct({ ...this.state });
  }

  errorMessage() {}

  render() {
    const { name, price, description, quantity, imageUrl, category } =
      this.state;
    const { handleChange, handleSubmit } = this;

    return (
      <div className="card">
        <div className="productdisplaycard">
          <h2 className="title">New Product</h2>
          <form className="" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name"> Name: </label>
              <input
                name="name"
                onChange={handleChange}
                value={name}
                required
              />
            </div>
            <div>
              <label htmlFor="price"> Price: </label>
              <input
                name="price"
                onChange={handleChange}
                value={price}
                required
              />
            </div>
            <div>
              <label htmlFor="quantity"> Quantity: </label>
              <input
                name="quantity"
                onChange={handleChange}
                value={quantity}
                required
              />
            </div>
            <div>
              <label htmlFor="description"> Description: </label>
              <input
                name="description"
                onChange={handleChange}
                value={description}
                required
              />
            </div>
            <div>
              <label htmlFor="imageUrl"> ImageUrl: </label>
              <input
                name="imageUrl"
                onChange={handleChange}
                value={imageUrl}
                required
              />
            </div>
            <div>
              <label htmlFor="category"> Category: </label>
              <input
                name="category"
                onChange={handleChange}
                value={category}
                required
              />
            </div>
            <div>
              <button type="submit">Create</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatch = (dispatch, { history }) => {
  return {
    createProduct: (product) => dispatch(fetchCreatedProduct(product, history)),
  };
};

export default connect(null, mapDispatch)(CreateProduct);
