import React from "react";
import { connect } from "react-redux";
import { startUpdateTickets } from "../../actions/ticketsAction";
import TicketsForm from "./Form";
import { withRouter} from 'react-router-dom'

function TicketEdit(props) {
  const handleSubmit = (formData,department, employee, customer) => {
    //   console.log(formData) 
    const id = props.match.params.id;
    const redirect = () => {
      props.history.push("/tickets");
    };
    props.dispatch(startUpdateTickets(formData, id, redirect, department, employee, customer));
  };
  return (
    <div>
      <h2>Edit Ticket</h2>
      <TicketsForm handleSubmit={handleSubmit} />
    </div>
  );
}

export default withRouter(connect()(TicketEdit));
