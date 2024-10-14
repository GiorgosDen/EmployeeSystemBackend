//App
const express = require('express');
const cors = require('cors');
const app = express();

const corsOptions = require('./config/corsOptions');
const login = require('./routes/login');
const manageEmployees = require("./routes/employeesRoute");
const verifyJWT = require("./middleware/verifyJWT");

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/logIn',login.router);
app.use(verifyJWT);
app.use('/homePage',manageEmployees);

module.exports=app;