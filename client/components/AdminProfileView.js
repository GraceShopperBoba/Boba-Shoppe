import React from "react";
import { connect } from "react-redux";
import { fetchUser } from "../redux/user";

export class AdminProfileView extends React.Component {
  componentDidMount() {
    const username = this.props.match.params.username;
    this.props.setUser(username);
  }

  render() {
    const user = this.props.user || {};
    console.log("PRops: ", this.props);

    console.log("USER: ", this.props.user[0]);
    //let user = this.props.user[0];
    console.log(Object.values({ user }));

    return (
      <div className="profileContainer">
        <div className="leftDiv">
          <h1>{user.firstName}'s Account</h1>
          <hr align="left" width="80%" color="black"></hr>
          <div className="tab">
            <br />
            <button>Account Information</button>
            <button>Order History</button>
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
          <div>
            <img src={user.imageUrl} alt="image" />
            <button>Edit Profile Pic</button>
          </div>
        </div>
        {/* <EditUser /> */}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (userId) => dispatch(fetchUser(userId)),
  };
};

export default connect(mapState, mapDispatchToProps)(AdminProfileView);
