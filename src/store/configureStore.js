import { createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import userReducers from '../reducers/userReducer'
import customersReducers from '../reducers/customersReducers'
import departmentsReducers from '../reducers/departmentsReducers'
import employeesReducers from '../reducers/employeesReducers'
import ticketsReducers from '../reducers/ticketsReducers'

const configureStore = () => {
    const store = createStore(combineReducers({
        user : userReducers,
        customers : customersReducers,
        departments : departmentsReducers,
        employees : employeesReducers,
        tickets : ticketsReducers
    }), applyMiddleware(thunk))
    return store
}

export default configureStore