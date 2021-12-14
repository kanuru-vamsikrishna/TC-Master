import React from "react";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom"; 
import register from "./components/register";  
import login from "./components/login";
import { connect } from "react-redux";
import Account from "./components/Account";
import Customerlist from "./components/customers/List";
import CustomerShow from "./components/customers/Show";
import CustomerNew from "./components/customers/New";
import CustomerEdit from "./components/customers/Edit";
import { startLogOut } from "./actions/userAction";
import DepartmentList from "./components/departments/List";
import DepartmentShow from "./components/departments/show";
import DepartmentEdit from "./components/departments/Edit";
import EmployessList from "./components/employees/List";
import EmployeeShow from "./components/employees/Show";
import EmployeeNew from "./components/employees/New";
import EmployeeEdit from "./components/employees/Edit";
import TicketsList from "./components/tickets/List";
import TicketNew from "./components/tickets/New";
import TicketShow from "./components/tickets/Show";
import TicketEdit from "./components/tickets/Edit";

function App(props) {   
  const handleLogout = () => {
    props.dispatch(startLogOut());
  };
  return (
    <BrowserRouter>
      <div>
        <nav class="navbar navbar-light bg-light">
          <div class="container-fluid">
            <span class="navbar-brand mb-0 h1">Ticket Master</span>
          </div>
          {Object.keys(props.user).length === 0 ? (
            <ul class="nav justify-content-end">
              <li class="nav-item">
                <Link class="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/users/login">
                  Login
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/users/registers">
                  Register
                </Link>
              </li>
            </ul>
          ) : (
            <ul class="nav justify-content-end">
              <li class="nav-item">
                <Link class="nav-link" to="/customers">
                  Customers
                </Link>
              </li>

              <li class="nav-item">
                <Link class="nav-link" to="/departments">
                  Departments
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/employees">
                  Employees
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/tickets">
                  Tickets
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/users/account">
                  Account
                </Link>
              </li>
              <li class="nav-item">
                <Link
                  class="nav-link"
                  to="#"
                  onClick={() => {
                    handleLogout();
                  }}
                >
                  Logout
                </Link>
              </li>
            </ul>
          )}
        </nav>
        <Switch>
          <Route path="/users/registers" component={register} />
          <Route path="/users/login" component={login} />
          <Route path="/users/account" component={Account} />
          <Route path="/customers" component={Customerlist} exact={true} /> 
          <Route path="/customers/new" component={CustomerNew} />
          <Route path="/customers/edit/:id" component={CustomerEdit} />
          <Route path="/customers/:id" component={CustomerShow} />
          <Route path="/departments" component={DepartmentList} exact={true} />
          <Route path="/departments/edit/:id" component={DepartmentEdit} />
          <Route path="/departments/:id" component={DepartmentShow} />
          <Route path="/employees" component={EmployessList} exact={true} />
          <Route path="/employees/new" component={EmployeeNew} />
          <Route path="/employees/edit/:id" component={EmployeeEdit} />
          <Route path="/employees/:id" component={EmployeeShow} />
          <Route path="/tickets" component={TicketsList} exact={true} />
          <Route path="/tickets/new" component={TicketNew} />
          <Route path="/tickets/edit/:id" component={TicketEdit} />
          <Route path="/tickets/:id" component={TicketShow} />  
        </Switch>
      </div>
    </BrowserRouter>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(App);
