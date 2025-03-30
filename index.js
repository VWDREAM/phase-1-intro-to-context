// Your code here
// Function to create a single employee record
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
        firstName,
        familyName,
        title,
        payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    };
}

// Function to create multiple employee records
function createEmployeeRecords(employeeData) {
    return employeeData.map(createEmployeeRecord);
}

// Function to add a TimeIn event to an employee record
function createTimeInEvent(employee, dateTime) {
    let [date, hour] = dateTime.split(" ");
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date
    });
    return employee;
}

// Function to add a TimeOut event to an employee record
function createTimeOutEvent(employee, dateTime) {
    let [date, hour] = dateTime.split(" ");
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date
    });
    return employee;
}

// Function to calculate hours worked on a specific date
function hoursWorkedOnDate(employee, targetDate) {
    let timeIn = employee.timeInEvents.find(event => event.date === targetDate);
    let timeOut = employee.timeOutEvents.find(event => event.date === targetDate);
    return (timeOut.hour - timeIn.hour) / 100;
}

// Function to calculate wages earned on a specific date
function wagesEarnedOnDate(employee, date) {
    return hoursWorkedOnDate(employee, date) * employee.payPerHour;
}

// Function to calculate total wages for all worked dates of an employee
function allWagesFor(employee) {
    return employee.timeInEvents.reduce((total, event) => {
        return total + wagesEarnedOnDate(employee, event.date);
    }, 0);
}

// Function to calculate payroll for all employees
function calculatePayroll(employees) {
    return employees.reduce((total, employee) => total + allWagesFor(employee), 0);
}
