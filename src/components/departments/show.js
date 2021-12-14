import React from "react";
import { connect } from "react-redux";
import { findDepartment } from "../../selsctors/departmentSelector";
import { Link } from "react-router-dom";

function DepartmentShow(props) {
  const { _id, name } = props.department || {};
  //   console.log(props.department, 'deptshow')
  return (
    <div>
      {props.department ? (
        <div>
          <h2>Department Deatils - {_id}</h2>
          <p>{name}</p>
          <br />
          <Link to={`/departments/edit/${_id}`}>edit</Link>
          <br />
          <Link to={`/departments`}>back</Link>
        </div>
      ) : (
        <div>loading...</div>
      )}
    </div>
  );
}

const mapStateToProps = (state, props) => {
  const id = props.match.params.id;
  console.log(id, "d id");
  return {
    department: findDepartment(state.departments, id),
  };
};

export default connect(mapStateToProps)(DepartmentShow);
