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
          <div class="container px-2">
            <label htmlFor="name" class="form-label">
              Name
            </label>
            <input
              type="text"
              class="form-control"
              id="name"
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
              class="form-control"
              id="email"
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
              type="number"
              class="form-control"
              id="mobile"
              name="mobile"
              value={this.state.mobile}
              onChange={this.handleChange}
            />
          </div>
          <br />
          <div class="container px-2">
            <label htmlFor="department" class="form-label">
              department
            </label>
            <select
              name="department"
              class="form-control"
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
          </div>
          <br />
          <center>
            <input type="submit" value="submit"class="btn btn-success" />
          </center>
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
