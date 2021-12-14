import React from "react";
import { connect } from "react-redux";
import { findDepartment } from "../../selsctors/departmentSelector";
import { withRouter } from "react-router-dom";

class DepartmentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.department ? props.department.name : "",
    };
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      name: this.state.name,
    };
    // console.log(formData)
    this.props.handleSubmit(formData);
    this.setState({
      name: "",
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
          {/* <label htmlFor="department">Add Department</label>  */}
          <br />
          <input
            type="text"
            id="department"
            name="name"
            value={this.state.name}
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
  const id = props.match.params.id;
  console.log(props);
  return {
    department: findDepartment(state.departments, id),
  };
};

export default withRouter(connect(mapStateToProps)(DepartmentForm));
