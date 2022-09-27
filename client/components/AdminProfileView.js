import React from "react";
import { connect } from "react-redux";
import { fetchUser } from "../redux/user";
import { fetchOrdersByUser } from "../redux/orders";
import EditUser from "./EditUser";

export class AdminProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
    };
  }

  componentDidMount() {
    const username = this.props.match.params.username;
    this.props.setUser(username);
    this.props.getOrders(username);
    console.log("GET ORDERS: ", this.props.orders);
    console.log("USERID: ", this.props);
  }

  componentDidCatch(event) {
    event.preventDefault();
  }

  render() {
    const user = this.props.user || {};
    let { orders } = this.props || [];
    let products = orders.products || [];

    console.log("ORDERS: ", orders);
    console.log("PRODICTS: ", products);

    return (
      <div className="profileContainer">
        <div className="leftDiv">
          <h1>{user.firstName}'s Account</h1>
          <hr align="left" width="80%" color="black"></hr>
          <div className="tab">
            <h3>
              name: {user.firstName} {user.lastName}
            </h3>
            <h3>Email: {user.email}</h3>
            <h3>username: {user.username}</h3>
            <img src={user.imageUrl} alt="image" />
          </div>
        </div>
        <div className="rightDiv">
          <div>
            <h1>Account Information</h1>
            <EditUser match={this.props.match} user={user} />
            <div></div>
          </div>
          <div className="order-history">
            <h2>Order History</h2>
            {products.map((product) => {
              return (
                <div>
                  <h1>{product.name}</h1>
                  <p> {product.quantity}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  //console.log("STATE", state.user.id);
  return {
    user: state.user,
    orders: state.orders,
    //userId: state.user.id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (userId) => dispatch(fetchUser(userId)),
    getOrders: (userId) => dispatch(fetchOrdersByUser(userId)),
  };
};

export default connect(mapState, mapDispatchToProps)(AdminProfileView);
