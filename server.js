//Server, creates mysql pool and exports pool-based promise,
// Sets the app to listening in Port 
const app = require('./app');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3500;

//Create mysql pool
const pool = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'Root#123',
    database:'Employee_System',
    waitForConnections:true,
    connectionLimit:25,
    queueLimit:0
});



app.listen(PORT,()=>console.log(`Server runs in PORT: ${PORT}`));

//export poolPromise
module.exports = pool.promise();