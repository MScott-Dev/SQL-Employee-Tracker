DROP DATABASE IF EXISTS employee_manager_db;
CREATE DATABASE employee_manager_db;

-- Creates the different tables to be used inside the database

CREATE TABLE departments (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
--   uses id from department
  FOREIGN KEY (department_id)
  REFERENCES departments(id)
);

CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
--   uses id from role
  FOREIGN KEY (role_id)
  REFERENCES roles(id)
--   uses id from employee
  FOREIGN KEY (manager_id)
  REFERENCES employees(id)
  DEFAULT NULL
);




USE employee_manager_db;