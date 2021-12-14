import React from "react";
import { connect } from "react-redux";
import { Chart } from "react-google-charts";
import {
  startDeleteTickets,
  startGetTickets,
} from "../../actions/ticketsAction";
import { Link } from "react-router-dom";
import { startGetEmployees } from "../../actions/employeesAction";
import { startGetDepartments } from "../../actions/departmentsAction";
import { startGetCustomers } from "../../actions/customersAction";
import { startUpdateTickets } from "../../actions/ticketsAction";

class TicketsList extends React.Component {
  constructor() {
    super();
    this.state = {
      completed: false,
    };
  }
  handleClick = (id) => {
    this.props.dispatch(startDeleteTickets(id));
  };
  getCustomerName = (id) => {
    console.log(id, "customer");
    const customer = this.props.customers.find((customer) => {
      return customer._id === id;
    });
    return customer;
  };
  getDepartmentName = (id) => {
    console.log(id, "department");
    const department = this.props.departments.find((department) => {
      return department._id === id;
    });
    return department;
  };
  getEmployeesName = (emp) => {
    console.log(emp, "emp");
    const empl = emp.map((em) => {
      return em.name;
    });
    return empl.join(",");
  };
  handleCheck = (ticket) => {
    ticket.completed = !ticket.completed;
    console.log(ticket);
    this.props.dispatch(startUpdateTickets(ticket, ticket._id));
  };
  handleShow = (id) => {
    this.props.history.push(`/tickets/${id}`);
  };
  handleComplete = (status) => {
    if (status === "pending") {
      this.setState({
        completed: false,
      });
    } else if (status === "completed") {
      this.setState({
        completed: true,
      });
    }
  };
  render() {
    if (this.props.tickets.length === 0) {
      this.props.dispatch(startGetCustomers());
      this.props.dispatch(startGetDepartments());
      this.props.dispatch(startGetEmployees());
      this.props.dispatch(startGetTickets());
    }
    return (
      <div class="container px-2">
        <br />
        <button
          type="button"
          class="btn btn-light mx-2"
          onClick={() => {
            this.handleComplete("pending");
          }}
        >
          Pending
        </button>
        <button
          type="button"
          class="btn btn-light mx-2"
          onClick={() => {
            this.handleComplete("completed");
          }}
        >
          Completed
        </button>
        <h2>
          Tickets List -
          {this.state.completed === true
            ? this.props.completed.length
            : this.props.pending.length}
        </h2>
        <table class="table  table-hover">
          <thead>
            <tr>
              <th>Code</th>
              <th>Customer</th>
              <th>Department</th>
              <th>Employees</th>
              <th>Message</th>
              <th>Priority</th>
              <th>Edit Details</th>
              <th>Remove</th>
              <th>
                {this.state.completed === true
                  ? "Mark as Pending"
                  : "Mark as Completed"}
              </th>
            </tr>
          </thead>
          <tbody>
            {this.state.completed === true
              ? this.props.completed.map((ticket) => {
                  return (
                    <tr key={ticket._id}>
                      <td>{ticket.code}</td>
                      <td>{ticket.customer && ticket.customer.name}</td>
                      <td>{ticket.department && ticket.department.name}</td>
                      <td>
                        {this.getEmployeesName(ticket.employees) &&
                          this.getEmployeesName(ticket.employees)}
                      </td>
                      <td>{ticket.message}</td>
                      <td>{ticket.priority}</td>
                      <td>
                        <button
                          class="btn btn-primary btn-sm"
                          onClick={() => {
                            this.handleShow(ticket._id);
                          }}
                        >
                          Show
                        </button>
                      </td>
                      <td>
                        <button
                          class="btn btn-danger btn-sm"
                          onClick={() => {
                            this.handleClick(ticket._id);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          onClick={() => {
                            this.handleCheck(ticket);
                          }}
                          checked={ticket.isResolved ? true : false}
                        />
                      </td>
                    </tr>
                  );
                })
              : this.props.pending.map((ticket) => {
                  return (
                    <tr key={ticket._id}>
                      <td>{ticket.code}</td>
                      <td>{ticket.customer && ticket.customer.name}</td>
                      <td>{ticket.department && ticket.department.name}</td>
                      <td>
                        {this.getEmployeesName(ticket.employees) &&
                          this.getEmployeesName(ticket.employees)}
                      </td>
                      <td>{ticket.message}</td>
                      <td>{ticket.priority}</td>
                      <td>
                        <button
                          class="btn btn-primary btn-sm"
                          onClick={() => {
                            this.handleShow(ticket._id);
                          }}
                        >
                          Show
                        </button>
                      </td>
                      <td>
                        <button
                          class="btn btn-danger btn-sm"
                          onClick={() => {
                            this.handleClick(ticket._id);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          onClick={() => {
                            this.handleCheck(ticket);
                          }}
                          checked={ticket.completed ? true : false}
                        />
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
        <Link to="/tickets/new">Add New Ticket</Link>
        <center>
          <h5>Completed Tickets-{this.props.percentage}%</h5>
        </center>
        <div class="progress my-3">
          <div
            class="progress-bar"
            role="progressbar"
            style={{ width: this.props.percentage + "%" }}
            aria-valuenow="0"
            aria-valuemin="0"
            aria-valuemax="100"
          >
            {this.props.percentage} %
          </div>
        </div>
        <div class="container">
          <center>
            <h4>Data on Pending Tickets</h4>
          </center>
          <div class="row">
            <div class="col-sm-6">
              <Chart
                width={"500px"}
                height={"300px"}
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={this.props.pie}
                options={{
                  title: "My Daily Activities",
                }}
                rootProps={{ "data-testid": "1" }}
              />
            </div>
            <div class="col-sm-6">
              <Chart
                width={"500px"}
                height={"300px"}
                chartType="Bar"
                loader={<div>Loading Chart</div>}
                data={this.props.barChart}
                options={{
                  // Material design options
                  chart: {
                    title: "Tickets by Department",
                  },
                }}
                // For tests
                rootProps={{ "data-testid": "2" }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  const tickets = state.tickets;
  const completed = tickets.filter((ticket) => {
    return ticket.completed;
  });
  const pending = tickets.filter((ticket) => {
    return !ticket.completed;
  });
  console.log(completed, "Completed");
  const percentage = (completed.length / tickets.length).toFixed(2) * 100;
  const High = pending.filter((ticket) => {
    return ticket.priority === "High";
  });
  const Low = pending.filter((ticket) => {
    return ticket.priority === "Low";
  });
  const Medium = pending.filter((ticket) => {
    return ticket.priority === "Medium";
  });
  const pie = [
    ["priority", "Total"],
    ["High", High.length],
    ["Medium", Medium.length],
    ["Low", Low.length],
  ];
  let list = [];
  pending.map((ticket) => {
    const depart = ticket.department._id;
    console.log(depart, "depart");
    let isExists = false;
    if (list.length > 0) {
      for (let i = 0; i < list.length; i++) {
        if (list[i].includes(depart)) {
          isExists = true;
          break;
        }
      }
    }
    if (isExists == false) {
      const finder = pending.filter((pend) => {
        return pend.department._id == depart;
      });
      const numberOfDept = [depart, finder.length];
      list.push(numberOfDept);
      console.log(list, "list");
    }
  });
  const barChart = list.map((lis) => {
    const dept = lis[0];
    const findDept = state.departments.find((dep) => {
      return dep._id == dept;
    });
    console.log(findDept.name, "name");
    return [findDept.name, lis[1]];
  });
  // console.log(barChart);
  barChart.unshift(["Department", "Total"]);
  return {
    tickets: state.tickets,
    completed: completed,
    pending: pending,
    departments: state.departments,
    customers: state.customers,
    employees: state.employees,
    percentage: percentage,
    pie: pie,
    barChart: barChart,
    list: list,
  };
};

export default connect(mapStateToProps)(TicketsList);
