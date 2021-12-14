import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { findEmployee } from "../../selsctors/employeeSelectors";

function EmployeeShow(props) {
  const { _id, name, email, department } = props.employee || {};
  console.log(props.employee);
  return (
    <div>
      {props.employee ? (
        <div>
          <h2>Employee Details - {_id}</h2>
          <p>
            {name} {email} {department.name}
          </p>
          <Link to={`/employees/edit/${_id}`}>edit</Link>
          <br />
          <Link to="/employees">back</Link>
        </div>
      ) : (
        <div>loading ...</div>
      )}
    </div>
  );
}

const mapStateToProps = (state, props) => {
  const id = props.match.params.id;
  return {
    employee: findEmployee(state.employees, id),
  };
};

export default connect(mapStateToProps)(EmployeeShow);
