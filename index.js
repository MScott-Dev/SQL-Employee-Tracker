// Dependencies
const inquirer = require('inquirer');
const db = require('./connect');

var editDataBase = function () {
    inquirer
        .prompt([
            {
                type: "list",
                message: "Which action would you like to perform?",
                choices: [
                    "View All Departments",
                    "View All Employees",
                    "View All Roles",
                    "Add Department",
                    "Add Employee",
                    "Add Role",
                    "Update A Role",
                ]
            }
        ])
            .then((answers) => {
                if (answers.prompt === 'View All Departments') {
                    // Displays all departments inside a table
                    db.query('SELECT * FROM departments', (err, result) => {
                        if (err) throw err;
                        console.log("Here's all the Departments.");
                        console.table(result);
                        editDataBase();
                    });
                } else if (answers.prompt === "View all Employees") {
                    // Displays all employees inside a table
                    db.query('SELECT * FROM employees', (err, result) => {
                        if (err) throw err;
                        console.log("Here's all the Employees.");
                        console.table(result);
                        editDataBase();
                    });
                } else if (answers.prompt === "View all Roles") {
                    // Displays all roles inside a table
                        db.query('SELECT * FROM roles', (err, result) => {
                            if (err) throw err;
                            console.log("Here's all the Roles.");
                            console.table(result);
                            editDataBase();
                        });
                } else if (answers.prompt === 'Add Department') {
                    // Lets the user add a new department into the database
                    inquirer.prompt([{
                        type: 'input',
                        name: 'department',
                        message: 'What is the new department?',
                        validate: departmentInput => {
                            if (departmentInput) {
                                return true;
                            } else {
                                console.log('Please enter a new department name!');
                                return false;
                            }
                        }
                    }])
                        .then((answers) => {
                            db.query('INSERT INTO departments (name) VALUES (?)', [answers.department], (err, result) => {
                                if (err) throw err;
                                console.log(`Added ${answers.department} into the database! View it using "View all Departments".`)
                                editDataBase();
                            });
                        })
                } else if (answers.prompt === 'Add Employee') {
                    // Calling the database to acquire the roles and employees
                    db.query(`SELECT * FROM employees, roles`, (err, result) => {
                        if (err) throw err;
        
                        inquirer.prompt([
                            {
                                type: 'input',
                                name: 'firstName',
                                message: 'What is the new employees first name?',
                                validate: firstNameInput => {
                                    if (firstNameInput) {
                                        return true;
                                    } else {
                                        console.log('Please Add Their First Name!');
                                        return false;
                                    }
                                }
                            },
                            {
                                type: 'input',
                                name: 'lastName',
                                message: 'What is the new employees last name?',
                                validate: lastNameInput => {
                                    if (lastNameInput) {
                                        return true;
                                    } else {
                                        console.log('Please Add Their Last Name!');
                                        return false;
                                    }
                                }
                            },
                            {
                                type: 'list',
                                name: 'role',
                                message: 'What is the new employees role?',
                                choices: () => {
                                    var array = [];
                                    for (var i = 0; i < result.length; i++) {
                                        array.push(result[i].title);
                                    }
                                    var newArray = [...new Set(array)];
                                    return newArray;
                                }
                            },
                            {
                                type: 'list',
                                name: 'manager',
                                message: 'Who is the employees manager? 1 for Matthew and 3 for Ashley',
                                choices: [1, 3]
                            }
                        ]).then((answers) => {
                            // Comparing the result and storing it into the variable
                            for (var i = 0; i < result.length; i++) {
                                if (result[i].title === answers.role) {
                                    var role = result[i];
                                }
                            }
        
                            db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, [answers.firstName, answers.lastName, role.id, answers.manager.id], (err, result) => {
                                if (err) throw err;
                                console.log(`Added ${answers.firstName} ${answers.lastName} to the database.`)
                               editDataBase();
                            });
                        })
                    });
                } else if (answers.prompt === "Add Role") {
                    db.query('SELECT * FROM roles', (err, result) => {
                        if (err) throw err;

                        inquirer.prompt([
                            {
                                type: 'input',
                                name: 'role',
                                message: 'What is the name of the new role?',
                                validate: roleInput => {
                                    if (roleInput) {
                                        return true;
                                    } else {
                                        console.log('Please Enter A Role!');
                                        return false;
                                    }
                                }
                            },
                            {
                                type: 'input',
                                name: 'salary',
                                message: 'What is the salary of the new role?',
                                validate: salaryInput => {
                                    if (salaryInput) {
                                        return true;
                                    } else {
                                        console.log('Please Enter A Salary!');
                                        return false;
                                    }
                                }
                            },
                            {
                                type: 'list',
                                name: 'department',
                                message: 'Which department does the role belong to?',
                                choices: () => {
                                    var array = [];
                                    for (var i = 0; i < result.length; i++) {
                                        array.push(result[i].name);
                                    }
                                    return array;
                                }
                            }
                        ]).then((answers) => {
                            // Comparing the result and storing it into the variable
                            for (var i = 0; i < result.length; i++) {
                                if (result[i].name === answers.department) {
                                    var department = result[i];
                                }
                            }
        
                            db.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`, [answers.role, answers.salary, department.id], (err, result) => {
                                if (err) throw err;
                                console.log(`Added ${answers.role} to the database.`)
                                editDataBase();
                            });
                        })
                    });
                
                }   
})}
        