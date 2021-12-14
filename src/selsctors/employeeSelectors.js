export const findEmployee = (employees, id) => {
    console.log( employees.find(employee => employee._id === id ))
    return employees.find(employee => employee._id === id )
}