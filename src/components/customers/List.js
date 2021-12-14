import React from "react";
import { connect } from "react-redux";
import {
  startGetCustomers,
  startRemoveCustomer,
} from "../../actions/customersAction";
import { Link } from "react-router-dom";

function Customerlist(props) {
  const handleRemove = (id) => {
    props.dispatch(startRemoveCustomer(id));
  };

  if (props.customers.length === 0) {
    props.dispatch(startGetCustomers());
  }
  const handleClick = (id) => {
    props.history.push(`/customers/${id}`);
  };
  return (
    <div class="container px-2">
      <h2>Listing Customers - {props.customers.length}</h2>
      <table class="table  table-hover">
        <thead>
          <tr>
            <th scope="col">S.No</th>
            <th scope="col">Customer</th>
            <th scope="col">Show</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {props.customers.map((customer, i) => {
            return (
              <tr key={customer._id}>
                <td>{i + 1}</td>
                <td>{customer.name}</td>
                <td>
                  <button
                    type="button"
                    class="btn btn-primary btn-sm"
                    onClick={() => {
                      handleClick(customer._id);
                    }}
                  >
                    Show
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-danger btn-sm"
                    onClick={() => {
                      handleRemove(customer._id);
                    }}
                  >
                    Remove
                  </button>
                </td>
                {/* <li class="my-2" key={customer._id}>
                  <Link class="me-4" to={`/customers/${customer._id}`}>
                    {customer.name}
                  </Link>{" "}
                  <button
                    onClick={() => {
                      handleRemove(customer._id);
                    }}
                  > 
                    remove
                  </button>
                </li> */}
              </tr>
            );
          })}
        </tbody>
      </table>

      <Link to="/customers/new">Add Customer</Link>
    </div>
  );
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    customers: state.customers,
  };
};

export default connect(mapStateToProps)(Customerlist);
