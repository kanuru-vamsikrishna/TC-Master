import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  startGetDepartments,
  startAddDepartment,
  startRemoveDepartment,
} from "../../actions/departmentsAction";
import DepartmentForm from "./Form";

function DepartmentList(props) {
  const handleRemove = (id) => {
    const confirmRemove = window.confirm("Are You Sure");
    if (confirmRemove) {
      props.dispatch(startRemoveDepartment(id));
    }
  };
  if (props.departments.length === 0) {
    props.dispatch(startGetDepartments());
  }
  const handleSubmit = (formData) => {
    //   const id = props.match.params.id
    props.dispatch(startAddDepartment(formData));
    // console.log(id)
  };
  const handleShow = (id) => {
    props.history.push(`/departments/${id}`);
  };

  return (
    <div class="container px-2">
      <h2>No Of Departments - {props.departments.length}</h2> 
      <table class="table  table-hover">
        <thead>
          <tr>
            <th scope="col">S.No</th>
            <th scope="col">Department</th>
            <th scope="col">Show</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {props.departments.map((department, i) => {
            return (
              <tr key={department._id}>
                <td>{i + 1}</td>
                <td>{department.name}</td>
                <td>
                  <button
                    class="btn btn-primary btn-sm"
                    onClick={() => {
                      handleShow(department._id);
                    }}
                  >
                    Show
                  </button>
                </td>
                <td>
                  <button
                    class="btn btn-danger btn-sm"
                    onClick={() => {
                      handleRemove(department._id);
                    }}
                  >
                    remove
                  </button>
                </td>
                {/* <li class="my-3" key={department._id}>
                  <Link to={`/departments/${department._id}`}>
                    {department.name}
                  </Link>
                </li> */}
              </tr>
            );
          })}
        </tbody>
      </table>
      <ul></ul>
      <switch>
        <DepartmentForm handleSubmit={handleSubmit} />
      </switch>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    departments: state.departments,
  };
};

export default connect(mapStateToProps)(DepartmentList);
