import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchDeletedUser, fetchUsers } from "../redux/users";
import { me } from "../store/auth";

export class AllUsers extends React.Component {
  constructor(props) {
    super(props);
    this.confirmation = this.confirmation.bind(this);
  }

  componentDidMount() {
    this.props.getUsers();
    this.props.currentUserData();
  }

  confirmation(userId) {
    const result = confirm("Are you sure you want to delete this user?");
    if (result) {
      this.props.deleteUser(userId);
    }
  }

  render() {
    const users = this.props.users || [];
    const isAdmin = this.props.isAdmin;
    return isAdmin ? (
      <div id="allUsers">
        <h2>All Users:</h2>
        <div className="itemContainer">
          {users.map((user) => {
            return (
              <div id="singleItem" key={user.id}>
                <div className="productDisplayCard">
                  <img src="/images/profile.jpg" alt="image" />
                  <h2>{user.username}</h2>
                  <Link to={`/users/${user.username}`}>
                    <button type="submit">Profile</button>
                  </Link>
                  <button
                    onClick={() => this.confirmation(user.id)}
                    type="submit"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    ) : (
      "Access Forbidden"
    );
  }
}

const mapState = (state) => {
  return {
    users: state.users,
    isAdmin: state.auth.adminAccess,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getUsers: () => dispatch(fetchUsers()),
  currentUserData() {
    dispatch(me());
  },
  deleteUser: (id) => dispatch(fetchDeletedUser(id)),
  //setUser: (username) => dispatch(fetchUser(username)),
});

export default connect(mapState, mapDispatchToProps)(AllUsers);
