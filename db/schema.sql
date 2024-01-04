DROP DATABASE IF EXISTS employee_manager_db;
CREATE DATABASE employee_manager_db;


USE employee_manager_db;
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
  department_id INT NOT NULL,
  FOREIGN KEY (department_id)
  REFERENCES departments(id)
);

CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
--   uses id from role
  role_id INT NOT NULL,
  FOREIGN KEY (role_id)
  REFERENCES roles(id),
  manager_id INT
);

