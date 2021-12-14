import React from "react";
import { connect } from "react-redux";
import { startUpdateEmployee } from "../../actions/employeesAction";
import EmployeeForm from "./Form";

function EmployeeEdit(props) {
  const handleSubmit = (formData,department) => {
    //   console.log(formData, department)
    const id = props.match.params.id;
    const redirect = () => {
      props.history.push("/employees");
    };
    props.dispatch(startUpdateEmployee(formData, id, redirect,department));
  };
  return (
    <div>
      <h2>Edit Employee Details</h2>
      <EmployeeForm handleSubmit={handleSubmit} />
    </div>
  );
}

export default connect()(EmployeeEdit);
