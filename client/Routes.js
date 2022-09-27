import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login, Signup } from "./components/AuthForm";
import Home from "./components/Home";
import { me } from "./store";
import AllProducts from "./components/AllProducts";
import Product from "./components/Product";
import AllUsers from "./components/AllUsers";
import Profile from "./components/Profile";
import AdminProfileView from "./components/AdminProfileView";
import Cart from "./components/Cart";
import CheckoutForm from "./components/CheckoutForm";

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;
    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Redirect from="/login" to="/home" />
            <Route path="/" exact component={AllProducts} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/products/:category?" component={AllProducts} />
            <Route exact path="/product/:id" component={Product} />
            <Route exact path="/users" component={AllUsers} />
            <Route exact path="/users/:username" component={AdminProfileView} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/checkout" component={CheckoutForm} />
          </Switch>
        ) : (
          <Switch>
            <Route path="/" exact component={AllProducts} />
            <Route exact path="/home" component={AllProducts} />
            <Route path="/login" component={Login} />
            <Route exact path="/products/:category?" component={AllProducts} />
            <Route exact path="/product/:id" component={Product} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/signup" component={Signup} />
          </Switch>
        )}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
