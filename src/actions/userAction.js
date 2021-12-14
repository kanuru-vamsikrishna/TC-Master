import axios from "../config/axios";
import Swal from "sweetalert2";

export const startRegister = (formData, redirect) => {
  return (dispatch) => {
    axios
      .post("/users/register", formData)
      .then((response) => {
        // console.log(response.data)
        if (response.data.hasOwnProperty("errors")) {
          alert(response.data.message);
        } else {
          redirect();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const setUser = (user) => {
  return { type: "SET_USER", payload: user };
};

export const startSetUser = () => {
  return (dispatch) => {
    axios
      .get("/users/account", {
        headers: {
          "x-auth": localStorage.getItem("authToken"),
        },
      })
      .then((response) => {
        const user = response.data.response;
        dispatch(setUser(user));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const startLogin = (formData, redirect) => {
  return (dispatch) => {
    axios.post("/users/login", formData).then((response) => {
      // console.log(response.data)
      if (response.data.hasOwnProperty("error")) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      } else {
        localStorage.setItem("authToken", response.data.token);
        // redirect()
        axios
          .get("/users/account", {
            headers: {
              "x-auth": localStorage.getItem("authToken"),
            },
          })
          .then((response) => {
            // console.log(response.data)
            const user = response.data.response;
            dispatch(setUser(user));
            Swal.fire({
              icon: "success",
              title: "Login",
              text: "Loggedin successfully.",
            });
            redirect();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };
};

export const removeUser = () => {
  return {
    type: "REMOVE_USER",
  };
};

export const startLogOut = () => {
  return (dispatch) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Logout",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      // console.log(result.isConfirmed);
      if (result.isConfirmed) {
        axios
          .delete("/users/logout", {
            headers: {
              "x-auth": localStorage.getItem("authToken"),
            },
          })
          .then((response) => {
            console.log(response, "lknsflnrwflk");
            if (response.data.notice) {
              localStorage.getItem("authToken");
              dispatch(removeUser());
              window.location.href = "/";
              Swal.fire({
                icon: "success",
                title: "Logout",
                text: response.data.notice,
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };
};
