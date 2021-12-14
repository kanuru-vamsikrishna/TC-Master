const employeInitialState = [];

const employeesReducers = (state = employeInitialState, action) => {
  switch (action.type) {
    case "GET_EMPLOYEE": {
      return [...action.payload];
    }
    case "ADD_EMPLOYEE": {
      return [...state, action.payload];
    }
    case "UPDATE_EMPLOYEE": {
      return state.map((employee) => {
        if (employee._id === action.payload._id) {
          return { ...employee, ...action.payload };
        } else {
          return { ...employee };
        }
      });
    }
    case "DELETE_EMPLOYEE": {
      return state.filter((employee) => employee._id !== action.payload);
    }
    default: {
      return [...state];
    }
  }
};

export default employeesReducers;
