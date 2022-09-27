import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import { me } from "../store/auth";

const Navbar = ({ handleClick, isLoggedIn, isAdmin }) => (
  <div className="navbar-container">
    <nav className="navbar">
      {isLoggedIn ? (
        <div className="link-container">
          <h1 className="shop-name">Boba Shoppe</h1>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">
            <img src="/images/homeIcon.png" />
          </Link>
          <Link to="/profile">
            <img src="/images/userIcon.png" />
          </Link>
          {isAdmin ? (
            <Link to="/users">
              <img src="/images/groupUsers.png" />
            </Link>
          ) : null}
          <Link to="/cart">
            <img src="/images/cartIcon.png" />
          </Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/home">
            <img src="/images/homeIcon.png" />
          </Link>
          <Link to="/cart">
            <img src="/images/cartIcon.png" />
          </Link>
          <Link to="/login">
            <img src="/images/userIcon.png" />
          </Link>
        </div>
      )}
    </nav>
  </div>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    isAdmin: state.auth.adminAccess,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
    currentUserData() {
      dispatch(me());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
