import axios from "../config/axios";
import Swal from "sweetalert2";

export const getTickets = (ticket) => {
  return {
    type: "GET_TICKETS",
    payload: ticket,
  };
};

export const startGetTickets = () => {
  return (dispatch) => {
    axios
      .get("/tickets", {
        headers: {
          "x-auth": localStorage.getItem("authToken"),
        },
      })
      .then((response) => {
        // console.log(response.data)
        const ticket = response.data.response;
        dispatch(getTickets(ticket));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const addTicket = (ticket) => {
  return {
    type: "ADD_TICKET",
    payload: ticket,
  };
};

export const startAddTickets = (formData, redirect) => {
  return (dispatch) => {
    axios
      .post("/tickets", formData, {
        headers: {
          "x-auth": localStorage.getItem("authToken"),
        },
      })
      .then((response) => {
        if (response.data.hasOwnProperty("errors")) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: response.data._message,
          });
        } else {
          console.log(response.data);
          axios
            .get("/tickets", {
              headers: {
                "x-auth": localStorage.getItem("authToken"),
              },
            })
            .then((response) => {
              // console.log(response.data)
              const ticket = response.data.response;
              dispatch(getTickets(ticket));
            })
            .catch((err) => {
              console.log(err);
            });
          redirect();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const deleteTicket = (ticket) => {
  return { type: "DELETE_TICKET", payload: ticket };
};

export const startDeleteTickets = (id) => {
  return (dispatch) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this ticket!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete ticket!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`/tickets/${id}`, {
            headers: {
              "x-auth": localStorage.getItem("authToken"),
            },
          })
          .then((response) => {
            // console.log(response.data)
            const ticket = response.data.response;
            dispatch(deleteTicket(ticket._id));
            Swal.fire("Deleted!", "Your ticket has been deleted.", "success");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };
};

export const updateTicket = (ticket) => {
  return { type: "UPDATE_TICKET", payload: ticket };
};

export const startUpdateTickets = (formData, id) => {
  return (dispatch) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to update this ticket!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update ticket!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(`/tickets/${id}`, formData, {
            headers: {
              "x-auth": localStorage.getItem("authToken"),
            },
          })
          .then((response) => {
            console.log(response.data);
            const ticket = response.data.response;
            dispatch(updateTicket(ticket));
            Swal.fire("Updated!", "Your ticket has been updated.", "success");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };
};
