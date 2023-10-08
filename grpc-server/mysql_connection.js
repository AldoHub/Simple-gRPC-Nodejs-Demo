let mysql = require("mysql");
let mysqlConnection = mysql.createConnection({
    host: '0.0.0.0',
    user: 'root',
    password: 'databasepass',
    database: 'rpc_cases'
});

mysqlConnection.connect((err) => {
    if(err) {
        console.log("Error connecting db ", err);
    }else{
        console.log("Connection Established");
    }
});

module.exports = mysqlConnection;
