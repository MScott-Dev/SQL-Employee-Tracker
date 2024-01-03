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
                }
            }
        )}