import React from "react";
import { connect } from "react-redux";
import { fetchEditedUser, fetchUser, fetchClearedUser } from "../redux/user";

export class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: this.props.user.firstName ? this.props.user.firstName : "",
      lastName: this.props.user.lastName ? this.props.user.lastName : "",
      email: this.props.user.email ? this.props.user.email : "",
      username: this.props.user.username ? this.props.user.username : "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.setUser(this.props.user.username);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.editUser({ ...this.props.user, ...this.state });
    window.location.reload(false);
  }

  componentWillUnmount() {
    this.props.clearUser();
  }

  render() {
    const { firstName, lastName, email, username } = this.state;
    const { handleChange, handleSubmit } = this;
    return (
      <div>
        <form className="edit-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="firstName"> First Name: </label>
            <input
              name="firstName"
              onChange={handleChange}
              value={firstName}
              required
            />
          </div>
          <div>
            <label htmlFor="lastName"> Last Name: </label>
            <input
              name="lastName"
              onChange={handleChange}
              value={lastName}
              required
            />
          </div>
          <div>
            <label htmlFor="email"> Email: </label>
            <input
              name="email"
              onChange={handleChange}
              value={email}
              required
            />
          </div>
          <div>
            <label htmlFor="username"> Username: </label>
            <input
              name="username"
              onChange={handleChange}
              value={username}
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
    user: state.user,
  };
};

const mapDispatch = (dispatch, { history }) => {
  return {
    editUser: (user) => dispatch(fetchEditedUser(user, history)),
    setUser: (username) => dispatch(fetchUser(username)),
    clearUser: () => dispatch(fetchClearedUser({})),
  };
};

export default connect(mapState, mapDispatch)(EditProfile);
