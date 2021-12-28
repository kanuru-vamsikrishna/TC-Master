import React from "react";
import { connect } from "react-redux";
import { startRegister } from "../actions/userAction";

class register extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      email: "",
      password: "",
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
    };
    // console.log(formData);
    const redirect = () => {
      return this.props.history.push("/users/login");
    };
    this.props.dispatch(startRegister(formData, redirect));
  };

  render() {
    return (
      <div>
        <center>
          <h1>Register</h1>
        </center>
        <form onSubmit={this.handleSubmit}>
          <div class="container px-2">
            <label htmlFor="username" class="form-label">
              UserName
            </label>
            <input
              type="text"
              id="username"
              class="form-control"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </div>
          <br />
          <div class="container px-2">
            <label htmlFor="email" class="form-label">
              Email
            </label>
            <input
              type="text"
              id="email"
              class="form-control"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>
          <br />
          <div class="container px-2">
            <label htmlFor="password" class="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              class="form-control"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
          <br />
          <center>
            <input type="submit" value="register" class="btn btn-success" />
          </center>
        </form>
      </div>
    );
  }
}

export default connect()(register);
