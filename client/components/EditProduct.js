import React from "react";
import { connect } from "react-redux";
import { fetchEditedProduct, fetchProduct } from "../redux/singleProduct";

export class EditUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      price: "",
      description: "",
      quantity: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // componentDidMount() {
  //   console.log("EDIT STUDENT: ", this.props);
  //   const username = this.props.match.params.username;
  //   const username = this.props.match.params.username;
  //   this.props.setUser(username);
  // }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.editProduct({ ...this.props.product, ...this.state });
  }

  render() {
    const { name, price, description, quantity } = this.state;
    const { handleChange, handleSubmit } = this;
    return (
      <div>
        <form className="edit-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name"> Name: </label>
            <input name="name" onChange={handleChange} value={name} required />
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
            <button type="submit">Update</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    product: state.product,
  };
};

const mapDispatch = (dispatch, { history }) => {
  return {
    editProduct: (product) => dispatch(fetchEditedProduct(product, history)),
    setProduct: (id) => dispatch(fetchProduct(id)),
  };
};

export default connect(mapState, mapDispatch)(EditUser);
