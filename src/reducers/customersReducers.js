const customerInitialState = [];

const customersReducers = (state = customerInitialState, action) => {
  switch (action.type) {
    case "SET_CUSTOMER": {
      return [...action.payload];
    }
    case "ADD_CUSTOMER": {
      return [...state, action.payload];
    }
    case "REMOVE_CUSTOMER": {
      return state.filter((customer) => customer._id !== action.payload);
    }
    case "UPDATE_CUSTOMER": {
      return state.map((customer) => {
        if (customer._id === action.payload._id) {
          return { ...customer, ...action.payload };
        } else {
          return { ...customer };
        }
      });
    } 
    default: {
      return [...state];
    }
  }
};

export default customersReducers;
