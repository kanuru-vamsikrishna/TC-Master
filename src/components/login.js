import React from "react";
import { connect } from 'react-redux'
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
    if(login) {
      const formData = {
        email: this.state.email,
        password: this.state.password,
      }; 
      const redirect = () => {
        return this.props.history.push('/') 
    }
    this.props.dispatch(startLogin(formData, redirect))
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
        <h1>login</h1>
        <form onSubmit={this.handleSubmit}>
          
          <br />
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            class="swal2-input"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
          />

          <br />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            class="swal2-input"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <br />
          <input type="submit" value="login" />
          
        </form>
      </div>
    );
  }
}

export default connect()(login)
