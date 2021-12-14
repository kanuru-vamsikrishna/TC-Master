import React from "react";
import { connect } from "react-redux";
import { findTicket } from "../../selsctors/ticketSelector";
import { Link } from "react-router-dom";

function TicketShow(props) {
  const { _id, code, customer, department, employees, message, priority } =
    props.ticket || {};
  console.log(props.ticket);
  const getCustomers = (customerId) => {
    const customer = props.customers.find((cust) => {
      // console.log(c)
      return cust._id === customerId;
    });
    return customer;
  };
  const getDepartment = (departmentId) => {
    const department = props.departments.find((dept) => {
      return dept._id === departmentId;
    });
    return department;
  };
  const getEmployee = (empId) => {
    const empData = empId.map((emp) => {
      return props.employees.find((employees) => {
        return employees._id == emp._id;
      });
    });
    // return empData
    console.log(empData);
    const names = empData.map((empl) => {
      return empl.name;
    });
    return names.join(" ");
  };
  return (
    <div>
      {props.ticket ? (
        <div>
          <h2>Ticket Details - {_id}</h2>
          <p>
            {code} {getCustomers(customer) && getCustomers(customer).name}{" "}
            {getDepartment(department) && getDepartment(department).name}{" "}
            {getEmployee(employees) && getEmployee(employees).name} {message}{" "}
            {priority}
          </p>
          <br />
          <Link to={`/tickets/edit/${_id}`}>edit</Link>
          <br />
          <Link to="/tickets">back</Link>
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
    ticket: findTicket(state.tickets, id),
    customers: state.customers,
    departments: state.departments,
    employees: state.employees,
  };
};

export default connect(mapStateToProps)(TicketShow);
