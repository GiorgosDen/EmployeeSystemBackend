//Router sends the allowedRoles
//The verifyRoles middleware checks if user has one unlist allowed role
const verifyRoles = (...allowedRoles)=>{
    return (req,res,next)=>{
        //Check if user has any role
        
        if(!req?.body.roles){
            console.log("Roles error");
            return res.sendStatus(401);
        }
        //get allowed roles
        const rolesList = [...allowedRoles];
        //mapping allowedroles with req.roles
        //If user has unlist one allowedRole, the mappingResult is true
        //a.    map() with includes(), return an array of true|false
        //b.    find(), return the first true element from array a. (if exists)
        const mappingResult = req.body.roles.map(rol=>rolesList.includes(rol)).find(item => item===true);
        //If user hasn't any roles, send status 401
        if(!mappingResult){
            return res.sendStatus(401);
            
        }
        next();
    }
}

module.exports =verifyRoles;