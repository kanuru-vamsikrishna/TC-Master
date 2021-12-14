import axios from "../config/axios";
import Swal from "sweetalert2";

export const setCustomer = (customer) => {
  return { type: "SET_CUSTOMER", payload: customer };
};

export const startGetCustomers = () => {
  return (dispatch) => {
    axios
      .get("/customers", {
        headers: {
          "x-auth": localStorage.getItem("authToken"),
        },
      })
      .then((response) => {
        console.log(response);
        const customer = response.data.response;
        dispatch(setCustomer(customer));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const addCustomer = (customer) => {
  return {
    type: "ADD_CUSTOMER",
    payload: customer,
  };
};

export const startAddCustomer = (formData, redirect) => {
  return (dispatch) => {
    axios
      .post("/customers", formData, {
        headers: {
          "x-auth": localStorage.getItem("authToken"),
        },
      })
      .then((response) => {
        // console.log(response.data)
        const customer = response.data.response;
        dispatch(addCustomer(customer));
        redirect();
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const removeCustomer = (id) => {
  return { type: "REMOVE_CUSTOMER", payload: id };
};

export const startRemoveCustomer = (id) => {
  return (dispatch) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this customer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete customer!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`/customers/${id}`, {
            headers: {
              "x-auth": localStorage.getItem("authToken"),
            },
          })
          .then((response) => {
            // console.log(response.data)
            const customer = response.data;
            dispatch(removeCustomer(customer._id));
            Swal.fire("Deleted!", "This customer has been deleted.", "success");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };
};

export const updateCustomer = (customer) => {
  return { type: "UPDATE_CUSTOMER", payload: customer };
};

export const startUpdateCustomer = (formData, id, redirect) => {
  return (dispatch) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to update customer information!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then((result) => {
      console.log(result.isConfirmed);
      if (result.isConfirmed) {
        axios
          .put(`/customers/${id}`, formData, {
            headers: {
              "x-auth": localStorage.getItem("authToken"),
            },
          })
          .then((response) => {
            // console.log(response.data);
            const customer = response.data;
            dispatch(updateCustomer(customer));
            Swal.fire("Updated", "Your Update has been successful.", "success");
            redirect();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };
};
