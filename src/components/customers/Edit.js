import React from "react";
import { connect } from "react-redux";
import CustomerForm from "./Form";
import { startUpdateCustomer } from "../../actions/customersAction";

function CustomerEdit(props) {
  const handleSubmit = (formData) => {
    const id = props.match.params.id;
    const redirect = () => {
      props.history.push("/customers");
    };
    props.dispatch(startUpdateCustomer(formData, id, redirect));
  };
  return (
    <div>
      <h2>Edit Customer</h2>
      <CustomerForm handleSubmit={handleSubmit} />
    </div>
  );
}

export default connect()(CustomerEdit);
