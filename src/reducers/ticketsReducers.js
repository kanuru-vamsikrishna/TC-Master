const ticketInitialState = [];

const ticketsReducers = (state = ticketInitialState, action) => {
  switch (action.type) {
    case "GET_TICKETS": {
      return [...action.payload];
    }
    case "ADD_TICKET": {
      return [...state, action.payload];
    }
    case "DELETE_TICKET": {
      return state.filter((ticket) => ticket._id !== action.payload);
    }
    case "UPDATE_TICKET": {
      return state.map((ticket) => {
        if (ticket._id === action.payload._id) {
          return { ...ticket, ...action.payload };
        } else {
          return { ...ticket };
        }
      });
    }
    default: {
      return [...state];
    }
  }
};

export default ticketsReducers;
