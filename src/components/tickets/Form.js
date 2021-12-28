import React from "react";
import { connect } from "react-redux";
import { findTicket } from "../../selsctors/ticketSelector";
import { withRouter, Link } from "react-router-dom";

class TicketsForm extends React.Component {
  constructor() {
    super();
    this.state = {
      code: "",
      customer: "",
      department: "",
      employees: [],
      message: "",
      priority: "",
      departmentEmployees: [],
    };
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      code: this.state.code,
      customer: this.state.customer,
      department: this.state.department,
      employees: this.state.employees,
      message: this.state.message,
      priority: this.state.priority,
    };
    // console.log(formData);
    this.props.handleSubmit(
      formData,
      this.props.customers,
      this.props.departments,
      this.props.employees
    );
  };
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleEmployee = (e) => {
    const employees = [];
    for (let emp of e.target.selectedOptions) {
      employees.push(emp.value);
    }
    // console.log(employees);
    this.setState({ employees });
  };
  handleDeptChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    const emp = this.props.employees.filter((employee) => {
      return employee.department._id === e.target.value;
    });
    console.log(emp, e.target.value);
    this.setState({
      departmentEmployees: emp,
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div class="container px-2">
            <label htmlFor="code" class="form-label">
              Code
            </label>
            <input
              type="text"
              class="form-control"
              id="code"
              name="code"
              value={this.state.code}
              onChange={this.handleChange}
            />
          </div>
          <br />
          <div class="container px-2">
            <label htmlFor="customer" class="form-label">
              Customer
            </label>
            <select
              name="customer"
              class="form-control"
              value={this.state.customer}
              onChange={this.handleChange}
            >
              <option>Select Customer</option>
              {this.props.customers.length > 0 &&
                this.props.customers.map((customer) => {
                  return <option value={customer._id}>{customer.name}</option>;
                })}
            </select>
          </div>
          <br />
          <div class="container px-2">
            <label htmlFor="department" class="form-label">
              Department
            </label>
            <select
              name="department"
              class="form-control"
              value={this.state.department}
              onChange={this.handleDeptChange}
            >
              <option>Select Department</option>
              {this.props.departments.length > 0 &&
                this.props.departments.map((department) => {
                  return (
                    <option value={department._id}>{department.name}</option>
                  );
                })}
            </select>
          </div>
          <br />
          <div class="container px-2">
            <label htmlFor="employees" class="form-label">
              Employees
            </label>
            <select
              name="employees"
              class="form-control"
              onChange={this.handleEmployee}
            >
              <option>Select Employee</option>
              {this.state.departmentEmployees.length > 0 &&
                this.state.departmentEmployees.map((employees) => {
                  return (
                    <option value={employees._id}>{employees.name}</option>
                  );
                })}
            </select>
          </div>
          <br />
          <div class="container px-2">
            <label htmlFor="message" class="form-label">
              Message
            </label>
            <textarea
              type="text"
              id="message"
              class="form-control"
              cols="30"
              row="30"
              name="message"
              onChange={this.handleChange}
            ></textarea>
          </div>
          <br />
          <h2>Priority</h2>

          <div>
            <input
              type="radio"
              id="high"
              name="priority"
              onChange={this.handleChange}
              value="High"
            />
            <label htmlFor="high">High</label>
            <br />
            <input
              type="radio"
              id="medium"
              name="priority"
              onChange={this.handleChange}
              value="Medium"
            />
            <label htmlFor="medium">Medium</label>
            <br />
            <input
              type="radio"
              id="low"
              name="priority"
              onChange={this.handleChange}
              value="Low"
            />
            <label htmlFor="low">Low</label>
          </div>

          <br />
          <input type="submit" value="Submit" />
          <br />
          <Link to="/tickets">back</Link>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const id = props.match.params.id;
  return {
    customers: state.customers,
    departments: state.departments,
    employees: state.employees,
    ticket: findTicket(state.tickets, id),
  };
};

export default withRouter(connect(mapStateToProps)(TicketsForm));
