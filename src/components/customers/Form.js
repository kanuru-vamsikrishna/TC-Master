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
          <label htmlFor="name">name</label>
          <input
            type="text"
            id="name"
            class="my-2"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <br />
          <label htmlFor="email">email</label>
          <input
            type="text"
            id="email"
            class="my-2"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <br />
          <label htmlFor="mobile">mobile</label>
          <input
            type="text"
            id="mobile"
            class="my-2"
            name="mobile"
            value={this.state.mobile}
            onChange={this.handleChange}
          />
          <br />
          <input type="submit" value="submit" />
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
