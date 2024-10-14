//This route: 
//1. Sends the Employees List (GET, all users allowed)
//2. Creates a new employee (POST, Director and Assistant allowed)
//3. Updates an employee (UPDATE, Director and Assistant allowed)
//4. Deletes an employee (DELETE, Director allowed)

const express = require('express');
const app = express.Router();

const verifyRoles = require('../middleware/verifyRoles');
const ROLES_LIST = require('../config/roles');

const employeesController = require("../controllers/employeesController");

app.route('/').get(employeesController.getEmployees).
post(verifyRoles(ROLES_LIST.Director,ROLES_LIST.Assistant),employeesController.addEmployee)
.put(verifyRoles(ROLES_LIST.Director,ROLES_LIST.Assistant),employeesController.updateEmployee)
.delete(verifyRoles(ROLES_LIST.Director),employeesController.deleteEmployee);

module.exports = app;