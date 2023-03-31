const mysql=require('mysql2');

// we will create a connection pool
// we are using pool because we need to run multiple queries simultaneously
// pool is finished when our application is shut down
const pool=mysql.createPool({
    host:'localhost',
    // root is the default user
    user:'root',
    database:'node-complete',
    password:'root'
});

// this will allow us to use promises (to handle asynchronous data)
module.exports=pool.promise();