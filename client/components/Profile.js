import React from "react";
import { connect } from "react-redux";
import { fetchUser } from "../redux/user";
import EditProfile from "./EditProfile";
import { EditUser } from "./EditUser";

export class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
  }

  componentDidMount() {
    const username = this.props.match.params.username;
    this.props.setUser(username);
  }

  render() {
    const user = this.props.user || {};
    return (
      <div className="profileContainer">
        <div className="leftDiv">
          <h1>{user.firstName}'s Account</h1>
          <hr align="left" width="80%" color="black"></hr>
          <div className="tab">
            <h3>
              Name: {user.firstName} {user.lastName}
            </h3>
            <h3>Email: {user.email}</h3>
            <h3>Username: {user.username}</h3>
          </div>
        </div>
        <div className="rightDiv">
          <div>
            <h1>Account Information</h1>

            <EditProfile />
          </div>

          <div>
            <img src={user.imageUrl} alt="image" />
            <button>Edit Profile Pic</button>
          </div>
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
