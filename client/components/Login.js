import React from "react";
import { connect } from "react-redux";
import { authenticate } from "../store";
import { Link } from "react-router-dom";
/**
 * COMPONENT
 */
const LogIn = (props) => {
  const { name, displayName, handleSubmit, error } = props;

  return (
    <div className="authPage">
      <form className="form-body" onSubmit={handleSubmit} name={name}>
        <h1 className="form-h1">LOG IN</h1>
        <div>
          <input
            className="form-input"
            name="username"
            placeholder="User name"
            type="text"
          />
        </div>
        <div>
          <input
            className="form-input"
            name="password"
            placeholder="password"
            type="password"
          />
        </div>
        <div>
          <button className="form-button" type="submit">
            {displayName}
          </button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
        <br></br>
        <h6>Don't have an Account?</h6>
        <Link to="/signup">
          <button type="button" className="signUp">
            Sign up
          </button>
        </Link>
      </form>
    </div>
  );
};

const SignUp = (props) => {
  const { name, displayName, handleSubmit, error } = props;

  return (
    <div className="authPage">
      <form className="form-body" onSubmit={handleSubmit} name={name}>
        <h1 className="form-h1">SIGN UP</h1>
        <div>
          <input
            className="form-input"
            name="username"
            placeholder="username"
            type="text"
          />
        </div>
        <div>
          <input
            className="form-input"
            name="password"
            placeholder="password"
            type="password"
          />
        </div>
        <div>
          <input
            className="form-input"
            name="firstname"
            placeholder="First Name"
            type="text"
          />
        </div>
        <div>
          <input
            className="form-input"
            name="lastname"
            placeholder="Last Name"
            type="text"
          />
        </div>
        <div>
          <input
            className="form-input"
            name="email"
            placeholder="email"
            type="email"
          />
        </div>
        <div>
          <button className="form-button" type="submit">
            {displayName}
          </button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
  );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: "login",
    displayName: "Login",
    error: state.auth.error,
  };
};

const mapSignup = (state) => {
  return {
    name: "signup",
    displayName: "Sign Up",
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const username = evt.target.username.value;
      const password = evt.target.password.value;
      dispatch(authenticate(username, password, formName));
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(LogIn);
export const Signup = connect(mapSignup, mapDispatch)(SignUp);
