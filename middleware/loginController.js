//Finds user and sends the access token
const jwt = require('jsonwebtoken');
require('dotenv').config();
//DB pool


const loginEvent = async (req,res)=>{
    const db = require('../server');
    //Get the imported data
    const logName = req.body.name;
    const logPassword  = req.body.password;

    //Name or Password are missing 
    if(!logName || !logPassword){
        return res.status(400).json({"message":"Name and Password are required"});
    }   

    //find user 
    try {
        const foundUserQuery = `SELECT * FROM User WHERE (userName='${logName}' AND userPassword='${logPassword}');`;
        const [foundedUsers] = await db.query(foundUserQuery);
        if(foundedUsers.length===0){
            return res.status(404).json({"message":"User not found"});
        }else{
            //Take user roles
            const foundUserRolesQuery = `SELECT roleID FROM UserConnRole WHERE userId=${foundedUsers[0].userId};`;
            const [foundUserRoles] = await db.query(foundUserRolesQuery);
            //Collect username/logname and role-codes
            const rolesCodes = foundUserRoles.map((data)=>data.roleID);
            const retObject = {
                username:logName,
                userRoles:rolesCodes
            }    
            //Create access token (lifetime: 120s -> 2min)
            const accesstoken = jwt.sign(
                {retObject},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn:120}
            )
            //send access token
            res.json({accesstoken,logName,rolesCodes});
        }
    } catch (error) {
        console.log(error);
        
    }
  
}

module.exports={loginEvent}