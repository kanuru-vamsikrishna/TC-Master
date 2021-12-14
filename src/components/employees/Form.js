import React from "react";
import { connect } from "react-redux";
import { findEmployee } from "../../selsctors/employeeSelectors";
import { withRouter } from "react-router-dom";

class EmployeeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.employee ? props.employee.name : "",
      email: props.employee ? props.employee.email : "",
      mobile: props.employee ? props.employee.mobile : "",
      department: props.employee ? props.employee.department._id : "",
    };
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      name: this.state.name,
      email: this.state.email,
      mobile: this.state.mobile,
      department: this.state.department,
    };
    // console.log(formData);
    this.props.handleSubmit(formData, this.props.departments);
  };
  handleDeptChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <br />
          <label htmlFor="email">email</label>
          <input
            type="text"
            id="email"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <br />
          <label htmlFor="mobile">mobile</label>
          <input
            type="number"
            id="mobile"
            name="mobile"
            value={this.state.mobile}
            onChange={this.handleChange}
          />
          <br />
          <label htmlFor="department">department</label>
          <select
            name="department"
            value={this.state.department}
            onChange={this.handleDeptChange}
          >
            <option selected>Select Department</option>
            {this.props.departments.length > 0 &&
              this.props.departments.map((department) => {
                return (
                  <option key={department._id} value={department._id}>
                    {department.name}
                  </option>
                ); 
              })}
          </select>
          <br />
          <input type="submit" value="submit" />
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  // console.log(props.match);
  const id = props.match.params.id;
  return {
    departments: state.departments,
    employee: findEmployee(state.employees, id),
  };
};

export default withRouter(connect(mapStateToProps)(EmployeeForm));
