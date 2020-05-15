DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
	id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE role (
	id INTEGER AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL, 
    salary FLOAT(2) DEFAULT(0.00),
    department_id INTEGER NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department(id)
);


CREATE TABLE employee (
	id INTEGER AUTO_INCREMENT PRIMARY KEY,
	first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    role_id INTEGER NOT NULL,
    manager_id INTEGER DEFAULT(-1),
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);

INSERT INTO department (id, name) VALUES (-1, 'n/a');
INSERT INTO department (id, name) VALUES (1, 'Engineering');
INSERT INTO department (id, name) VALUES (2, 'Finance');
INSERT INTO department (id, name) VALUES (3, 'Legal');
INSERT INTO department (id, name) VALUES (4, 'Sales');

INSERT INTO role (id, title, salary, department_id) VALUES (-1, 'n/a', 0, -1);
INSERT INTO role (title, salary, department_id) VALUES ('Lead Engineer', 150000, 1);
INSERT INTO role (title, salary, department_id) VALUES ('Software Engineer', 125000, 1);
INSERT INTO role (title, salary, department_id) VALUES ('Accountant Manager', 1750000, 2);
INSERT INTO role (title, salary, department_id) VALUES ('Accountant', 125000, 2);
INSERT INTO role (title, salary, department_id) VALUES ('Legal Team Lead', 250000, 3);
INSERT INTO role (title, salary, department_id) VALUES ('Lawyer', 190000, 3);
INSERT INTO role (title, salary, department_id) VALUES ('Sales Lead', 100000, 4);
INSERT INTO role (title, salary, department_id) VALUES ('Salesperson', 80000, 4);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (-1, 'n', '/a', -1, -1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE ('Carrol', 'Barnoff', 1, -1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE ('Jade', 'Smith', 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE ('Conan', 'Doyle', 3, -1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE ('Karina', 'Dorevko', 4, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE ('Kris', 'Kiov', 5, -1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE ('Mary', 'Magdalena', 6, 5);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE ('Corry','Burnsmith', 7, -1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE ('James','Bond', 8, 7);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE ('Gina', 'West', 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE ('Carol', 'Yun', 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE ('Petra', 'Marlow', 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE ('Berry', 'Allen', 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE ('Joshua','Wiet', 6, 5);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE ('Kara','Denver', 8, 7);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE ('Chris','Foyer', 8, 7);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE ('Kida','Akashima', 8, 7);