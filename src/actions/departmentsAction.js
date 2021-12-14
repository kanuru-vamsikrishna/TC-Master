import axios from "../config/axios";

export const setDepartment = (department) => {
  return { type: "SET_DEPARTMENT", payload: department };
};

export const startGetDepartments = () => {
  return (dispatch) => {
    axios
      .get("/departments", {
        headers: {
          "x-auth": localStorage.getItem("authToken"),
        },
      })
      .then((response) => {
        // console.log(response.data, 'kcb')
        const department = response.data.response;
        dispatch(setDepartment(department));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const addDepartment = (department) => {
  return { type: "ADD_DEPARTMENT", payload: department };
};

export const startAddDepartment = (formData) => {
  return (dispatch) => {
    axios
      .post("/departments", formData, {
        headers: {
          "x-auth": localStorage.getItem("authToken"),
        },
      })
      .then((response) => {
        // console.log(response.data, 'knhv');
        const department = response.data.response;
        dispatch(addDepartment(department));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const updateDepartment = (department) => {
  return { type: "UPDATE_DEPARTMENT", payload: department };
};

export const startUpdateDepartment = (formData, id, redirect) => {
  return (dispatch) => {
    axios
      .put(`/departments/${id}`, formData, {
        headers: {
          "x-auth": localStorage.getItem("authToken"),
        },
      })
      .then((response) => {
        const department = response.data;
        dispatch(updateDepartment(department));
        redirect();
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const removeDepartment = (id) => {
  return { type: "REMOVE_DEPARTMENT", payload: id };
};

export const startRemoveDepartment = (id) => {
  return (dispatch) => {
    axios
      .delete(`/departments/${id}`, {
        headers: {
          "x-auth": localStorage.getItem("authToken"),
        },
      })
      .then((response) => {
        const department = response.data;
        dispatch(removeDepartment(department._id));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
