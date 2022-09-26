import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import { me } from "../store/auth";

const Navbar = ({ handleClick, isLoggedIn, isAdmin }) => (
  <div className="navbar-container">
    <nav className="navbar">
      Boba Shoppe
      {isLoggedIn ? (
        <div className="link-container">
          {/* The navbar will show these links after you log in */}
          <Link to="/home">
            <img className="nav-icons" src="/images/homeIcon.png" />
          </Link>
          <Link to="/profile">
            <img className="nav-icons" src="/images/userIcon.png" />
          </Link>
          {isAdmin ? (
            <Link to="/users">
              <img src="/images/groupUsers.png" />
            </Link>
          ) : null}
          <Link to="/cart">
            <img className="nav-icons" src="/images/cartIcon.png" />
          </Link>
          <div className="logout-container">
            <a href="#" onClick={handleClick} className="logout-button">
              Logout
            </a>
          </div>
        </div>
      ) : (
        <div className="navbar-container">
          <div>
            {/* The navbar will show these links before you log in */}
            <Link to="/home">
              <img className="nav-icons" src="/images/homeIcon.png" />
            </Link>
            <Link to="/cart">
              <img className="nav-icons" src="/images/cartIcon.png" />
            </Link>
            <Link to="/login">
              <img className="nav-icons" src="/images/userIcon.png" />
            </Link>
          </div>
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
