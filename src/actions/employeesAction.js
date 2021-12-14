import axios from "../config/axios";
import { findDepartment } from "../selsctors/departmentSelector";
import Swal from "sweetalert2";

export const getEmployees = (employee) => {
  return { type: "GET_EMPLOYEE", payload: employee };
};

export const startGetEmployees = () => {
  return (dispatch) => {
    axios
      .get("/employees", {
        headers: {
          "x-auth": localStorage.getItem("authToken"),
        },
      })
      .then((response) => {
        // console.log(response.data)
        const employee = response.data.response;
        dispatch(getEmployees(employee));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const addEmployee = (employee) => {
  return { type: "ADD_EMPLOYEE", payload: employee };
};

export const startAddEmployee = (formData, redirect) => {
  return (dispatch) => {
    axios
      .post("/employees", formData, {
        headers: {
          "x-auth": localStorage.getItem("authToken"),
        },
      })
      .then((response) => {
        console.log(response.data);
        const employee = response.data;
        dispatch(addEmployee(employee));
        redirect();
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const updateEmployee = (employee, department) => {
  const id = employee.department;
  const d = findDepartment(department, id);
  employee.department = d;
  return { type: "UPDATE_EMPLOYEE", payload: employee };
};

export const startUpdateEmployee = (formData, id, redirect, department) => {
  return (dispatch) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to update employee ",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update employee!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(`/employees/${id}`, formData, {
            headers: {
              "x-auth": localStorage.getItem("authToken"),
            },
          })
          .then((response) => {
            console.log(response.data);
            const employee = response.data;
            // console.log(employee, "employee update");
            dispatch(updateEmployee(employee, department));
            Swal.fire("Updated!", "Your employee has been updated.", "success");
            redirect();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };
};

export const deleteEmployee = (employee) => {
  return { type: "DELETE_EMPLOYEE", payload: employee };
};

export const startDeleteEmployees = (id) => {
  return (dispatch) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this employee!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete employee!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`/employees/${id}`, {
            headers: {
              "x-auth": localStorage.getItem("authToken"),
            },
          })
          .then((response) => {
            console.log(response.data);
            const employee = response.data;
            dispatch(deleteEmployee(employee._id));
            Swal.fire("Deleted!", "Your employee has been deleted.", "success");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };
};
