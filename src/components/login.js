import React from "react";
import { connect } from "react-redux";
import { startLogin } from "../actions/userAction";

class login extends React.Component {
  constructor() {
    super();
    this.state = {
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
    // const login = Swal.fire(
    //   'Good job!',
    //   'You clicked the button!',
    //   'success'
    // )
    if (login) {
      const formData = {
        email: this.state.email,
        password: this.state.password,
      };
      const redirect = () => {
        return this.props.history.push("/");
      };
      this.props.dispatch(startLogin(formData, redirect));
    }
    // const formData = {
    //   email: this.state.email,
    //   password: this.state.password,
    // };
    // console.log(formData)
    // const redirect = () => {
    //     return this.props.history.push('/')
    // }
    // this.props.dispatch(startLogin(formData, redirect))
  };

  render() {
    return (
      <div>
        <center>
          <h1>Login</h1>
        </center>
        <form onSubmit={this.handleSubmit}>
          <br />
          <div class="container px-2">
            <input
              type="text"
              placeholder="Mobile number or Email address"
              class="form-control"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>
          <br />
          <div class="container px-2">
            <input
              type="password"
              placeholder="Password"
              class="form-control"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
          <br />
          <center>
            <input type="submit" value="login" class="btn btn-success" />
          </center>
        </form>
      </div>
    );
  }
}

export default connect()(login);
