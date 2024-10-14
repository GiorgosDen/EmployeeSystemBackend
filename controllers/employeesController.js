//Employee Controller

//If employee with specific AFM exists, returns the employee
//else =, returns empty list
const foundEmployee = async (emplAFM)=>{
    const db = require('../server');
    try {
        //look if employee with req.AFM exists
        const foundEmployeeQuery = `SELECT * FROM Employee_System.Employee WHERE employeeAFM=${emplAFM};`; 
        const [foundEmployee] = await db.query(foundEmployeeQuery);
        if(foundEmployee.length===1){
            return foundEmployee[0];
        }
        return null;
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

const getEmployees = async (req,res)=>{
    const db =require('../server');
    try {
        const getEmployeesQuery = "SELECT * FROM Employee;";
        const [employessObject] = await db.query(getEmployeesQuery);
        res.send(employessObject);   
    } catch (error) {
        console.log(error);
    }
}

//req.body= {roles:[...],{data:{afm,fullname,job,age,email,description,userId}}
//all parametres are strings except age and userId
//Also userId is 
const addEmployee = async (req,res)=>{
    const db = require('../server');
    const employee ={
        afm:req.body.data.afm,
        fullName:req.body.data.fullname,
        jobTitle:req.body.data.job,
        age:req.body.data.age,
        email:req.body.data.email,
        description:req.body.data.description,
        userId:req.body.data.userId
    }
    try {
        //If foundEmployee(AFM) returns [null] ([0]===null) it's means the user doesn't exists
        const researchRes = await foundEmployee(employee.afm); 
        if(researchRes===null){
            const addEmployeeQuery =`INSERT INTO Employee (employeeAFM, employeeFullName,employeeJob,employeeAge, employeeEmail,employeeDescription) VALUES ('${employee.afm}','${employee.fullName}','${employee.jobTitle}',${employee.age},'${employee.email}','${employee.description}');`
            const [addEmployeeRes] = await db.query(addEmployeeQuery);
            //Check if INSERT is successfully
            if(addEmployeeRes.affectedRows===1){
                res.sendStatus(201);
            }
        }else{
            //An employee with AFM==req.afm already exists
            return res.sendStatus(409);//trying duplicate or already resource/employee exists
        }
    
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

//req.body:{roles:[],data:{afm:....}}
const deleteEmployee= async (req,res)=>{
    const db = require('../server');
    const delEmplAFM = req.body.data.afm;
    const researchRes = await foundEmployee(delEmplAFM);
    //If foundEmployee doesn't returns null, it's means the eployee exists
    //So we can delete him
    if(researchRes!==null){
        try {
            const deleteEmployeeQuery = `DELETE FROM Employee WHERE employeeAFM=${delEmplAFM};`;
            const [deleteRes] = await db.query(deleteEmployeeQuery);
            //Check the delete Results
            if(deleteRes.affectedRows===1){
                res.sendStatus(200);
            }
        } catch (error) {
            console.log(error);
            return res.sendStatus(500);
        }
    }else{
        return res.sendStatus(404);
    }
}
//req.body:{roles:[],currentAFM:....,data:{afm:....}}
//We dont touch the userId
const updateEmployee = async(req,res)=>{
    const db = require('../server');
    const updEmplAFM = req.body.currentAFM;
    const employee ={
        afm:req.body.data.afm,
        fullName:req.body.data.fullname,
        jobTitle:req.body.data.job,
        age:req.body.data.age,
        email:req.body.data.email,
        description:req.body.data.description,
        userId:req.body.data.userId
    }
    const researchRes = await foundEmployee(updEmplAFM);//Find the user by AFM 
    const afmAvailiable = await foundEmployee(employee.afm);//Find if user with req.afm exists (in case that we want change the afm)
    //If foundEmployee doesn't returns null, it's means the eployee exists
    //So we can update him
    if(researchRes!==null){
        //If new AFM is ''free''
        if((afmAvailiable===null && updEmplAFM!==employee.afm) || updEmplAFM===employee.afm){
            try {
                const updateEmployeeQuery = `UPDATE Employee SET employeeAFM=${employee.afm}, employeeFullName='${employee.fullName}',employeeJob='${employee.jobTitle}',employeeAge=${employee.age}, employeeEmail='${employee.email}',employeeDescription='${employee.description}' WHERE employeeAFM=${updEmplAFM};`;
                const [updateRes] = await db.query(updateEmployeeQuery);
                //Check the update Results
                if(updateRes.affectedRows===1){
                    res.sendStatus(200);
                }
            } catch (error) {
                console.log(error);
                return res.sendStatus(500);
            }
        }else{
            return res.sendStatus(409);//The afm is used
        }
    }else{
        return res.sendStatus(404);
    }
}

module.exports= {
    getEmployees,
    addEmployee,
    deleteEmployee,
    updateEmployee
};