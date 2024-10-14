# EmployeeSystemBack
This repository contains the EmployeeSystem's APIs. The Employee System project represents a simple app to manage the employees of a company, and this repository has the backend program where the APIs interact with the database, so this project is middleware.

## About Back
This project was developed with Visual Studio Code using NodeJS and related requirements. The EmployeeSystem has been used by 3 user types: The Director, the Assistant, and the User. These roles have a hierarchy with the Director on top, after the Assistant, and at the end the User. When a user logs in, has 2 minutes to manage the employees until must re-login again. 
The System's functions in association with the roles are: 

**View Employee List:** Every user has permission 

**Add a new Employee:** The Director and Assistant have the permission 

**Update an existing Employee:** The Director and Assistant have permission 

**Delete an existing Employee:** Only the Director has permission

The main goal of this project is to respect the hierarchy of roles, in combination with ensuring identification (during user login) and direct communication with the database.

**The back runs locally at PORT: 3500, in the localhost**

## Project's Requests:
### In address: localhost:3500/:
- POST: It sends the username and the password in the body request. The response that takes is a JSON file that contains 3 fields: The AccessToken, the username with which the user logins, and a list of role codes this user has (status code 200). In case something is wrong (missing data/code 400 or the user not found/ code 404), the response is a JSON file with a message.
### In address: localhost:3500/homePage
Except for the login (Authentication), every request needs the Access Token to Authorization
- GET: Returns a list that contains all employees 
For the following requests, are necessary the role codes for Authorization based on the hierarchy
- POST: It's used to create/add a new employee. The request sends the role codes (as a list in the roles field) and the new employee's data (data field). The code 201 is the response
- PUT: It's used to update an employee. Like the POST request, it sends the roles and employee data and additionally sends the employee AFM/primary key (with the currentAFM field). They require all data of an employee to be sent with the request. The code 200 is the response
- DELETE: It's used to delete an employee.  The request sends the user codes and the employee's AFM. The code 200 is the response

! If a server issue appears, then a response has the status code 500 
! If the Access Token expires, then a response has the status code 403 (Forbidden)
! If the user doesn't authorize, then a response has the status code 401 (Unauthorized)
