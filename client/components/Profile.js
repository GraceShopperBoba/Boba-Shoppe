import React from "react";
import { connect } from "react-redux";
import { fetchUser } from "../redux/user";
import { Link } from "react-router-dom";

export class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
    this.openCity = this.openCity.bind(this);
  }

  componentDidMount() {
    this.props.setUser(this.props.username);
  }

  openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
  }
  render() {
    let user = this.props.user;
    console.log("this", user);
    return (
      <div className="profileContainer">
        <div className="leftDiv">
          <h1>My Account</h1>
          <hr align="left" width="80%" color="black"></hr>
          <div className="tab">
            <button>Account Information</button>
            <button>My Orders</button>
            <button>My Wishlist</button>
            <button>Password Reset</button>
            <button>Address & Payments</button>
          </div>
        </div>
        <div className="rightDiv">
          <div>
            <h1>Account Information</h1>
            <h3>
              name: {user.firstName} {user.lastName}
            </h3>
            <h3>Email: {user.email}</h3>
            <h3>username: {user.username}</h3>
          </div>
          <img src={user.imageUrl} alt="image" />
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    user: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (userId) => dispatch(fetchUser(userId)),
  };
};

export default connect(mapState, mapDispatchToProps)(Profile);
