import React from "react";
import { connect } from "react-redux";
// import EmployeeForm from "./Form";
import { Link } from "react-router-dom";
import {
  startGetEmployees,
  startDeleteEmployees,
} from "../../actions/employeesAction";

function EmployessList(props) {
  const handleClick = (id) => {
    props.dispatch(startDeleteEmployees(id));
  };
  if (props.employees.length === 0) {
    props.dispatch(startGetEmployees());
  }
  const handleShow = (id) => {
    props.history.push(`/employees/${id}`);
  };
  return (
    <div class="container px-2">
      <h2>List Of Employees - {props.employees.length}</h2>
      <table class="table  table-hover">
        <thead>
          <tr>
            <th scope="col">S.No</th>
            <th scope="col">Employees</th>
            <th scope="col">Show</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {props.employees.map((employee, i) => {
            return (
              <tr key={employee._id}>
                <td>{i + 1}</td>
                <td>{employee.name}</td>
                <td>
                  <button
                    class="btn btn-primary btn-sm"
                    onClick={() => {
                      handleShow(employee._id);
                    }}
                  >
                    Show
                  </button>
                </td>
                <td>
                  <button
                    class="btn btn-danger btn-sm"
                    onClick={() => {
                      handleClick(employee._id);
                    }}
                  >
                    Remove
                  </button>
                </td>
                {/* <li key={employee.id}>
              <Link to={`/employees/${employee._id}`}>{employee.name}</Link>
              <button
                onClick={() => {
                  handleClick(employee._id);
                }}
              >
                Remove
              </button>
            </li> */}
              </tr>
            );
          })}
        </tbody>
      </table>

      <Link to={`/employees/new`}>Add Employee</Link>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    employees: state.employees,
  };
};
export default connect(mapStateToProps)(EmployessList);
