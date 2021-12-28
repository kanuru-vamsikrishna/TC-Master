import React from "react";
import { connect } from "react-redux";
import { findCustomer } from "../../selsctors/customerSelector";
import { withRouter } from "react-router-dom";

class CustomerForm extends React.Component {
  constructor(props) {
    console.log("customer form constructor", props);
    super(props);
    this.state = {
      name: props.customer ? props.customer.name : "",
      email: props.customer ? props.customer.email : "",
      mobile: props.customer ? props.customer.mobile : "",
    };
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      name: this.state.name,
      email: this.state.email,
      mobile: this.state.mobile,
    };
    // console.log(formData)
    // this.props.dispatch(startAddCustomer(formData));
    this.props.handleSubmit(formData);
  };
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  render() {
    return (
      <div class="container px-2">
        <form onSubmit={this.handleSubmit}>
          <div class="container px-2">
            <label htmlFor="name" class="form-label">
              name
            </label>
            <input
              type="text"
              id="name"
              class="form-control"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </div>
          <br />
          <div class="container px-2">
            <label htmlFor="email" class="form-label">
              email
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
            <label htmlFor="mobile" class="form-label">
              mobile
            </label>
            <input
              type="text"
              id="mobile"
              class="form-control"
              name="mobile"
              value={this.state.mobile}
              onChange={this.handleChange}
            />
          </div>
          <br />
          <center>
            <input type="submit" value="submit" class="btn btn-success" />
          </center>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  console.log("form", props);
  const id = props.match.params.id;
  return {
    customer: findCustomer(state.customers, id),
  };
};

export default withRouter(connect(mapStateToProps)(CustomerForm));
