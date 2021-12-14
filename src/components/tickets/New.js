import React from "react";
import { connect } from "react-redux";
import { startAddTickets } from "../../actions/ticketsAction";
import TicketsForm from "./Form";

function TicketNew(props) {
    const handleSubmit = (formData) => {
        const redirect = () => {
            props.history.push('/tickets')
        }
        props.dispatch(startAddTickets(formData, redirect))
    }
  return (
    <div>
      <h2>Add a Ticket</h2>
      <TicketsForm handleSubmit={handleSubmit}/>
    </div>
  );
}

export default connect()(TicketNew);
