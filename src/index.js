import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from "react-redux"
import configureStore from './store/configureStore'
import { startSetUser } from './actions/userAction'
import { startGetCustomers } from './actions/customersAction'
import { startGetDepartments } from './actions/departmentsAction'
import { startGetEmployees } from './actions/employeesAction'
import { startGetTickets } from './actions/ticketsAction'

const store = configureStore()
console.log(store.getState())

store.subscribe(() => {
    console.log(store.getState())
})
// handle page reloads  
if(localStorage.getItem('authToken')) {
    store.dispatch(startSetUser()) 
}

if(localStorage.getItem('authToken')) {
    store.dispatch(startGetCustomers())
}

if(localStorage.getItem('authToken')) {
    store.dispatch(startGetDepartments()) 
}

if(localStorage.getItem('authToken')) {
    store.dispatch(startGetEmployees())
}
if(localStorage.getItem('authToken')) {
    store.dispatch(startGetTickets())
}
const jsx = (
    <Provider store={store}>
        <App />
    </Provider>
)

ReactDOM.render(jsx, document.getElementById('root'))