const inquirer = require('inquirer');
const sequelize = require('./connect');

function editDataBase() {
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
}