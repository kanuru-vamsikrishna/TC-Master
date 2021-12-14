import React from "react";
import { connect } from "react-redux";
import { findCustomer } from "../../selsctors/customerSelector";
import { Link } from "react-router-dom";

function CustomerShow(props) {
  const { _id, name, email, mobile } =
    (props.customer._id && props.customer) || {};
  return (
    <div>     
      {props.customer ? (
        <div>
          <h2>Customer Details - {_id}</h2>
          <p>
            {name} {mobile} {email}
          </p>
          <Link to={`/customers/edit/${_id}`}>Edit</Link>
          <br />
          <Link to="/customers">back</Link>
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
    customer: findCustomer(state.customers, id),
  };
};
export default connect(mapStateToProps)(CustomerShow);
