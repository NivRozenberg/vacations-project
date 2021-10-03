// const config = require("../global.json");
const mysql = require("mysql");
const uuid = require("uuid"); // npm i uuid
const cryptoHelper = require("../helpers/crypto-helper");
const jwtHelper = require("../helpers/jwt-helper");


const connection = mysql.createPool({
    host: config.database.host,
    user: config.database.user,
    password: config.database.password,
    database: config.database.name,
  });
  

function executeAsync(sql) {
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
}


async function registerAsync(user) {



    const checkUserName = `Select * from users WHERE userName = '${user.userName}'`
    const result = await executeAsync(checkUserName);
    if(result.length > 0){
        return 0
    } else {

    // Hash password: 
    user.password = cryptoHelper.hash(user.password); // שולחים את הסיסמא לפונקציה שעושה hash

    // Create uuid:
    user.uuid = uuid.v4();

    const sql = `INSERT INTO users VALUES(DEFAULT, '${user.uuid}', '${user.firstName}', '${user.lastName}', '${user.userName}', '${user.password}')`;
    const info = await executeAsync(sql);

    // no need to return back id, only uuid:
    // user.id = info.insertId;

    // Delete password so it won't returned to the frontend: 
    delete user.password;

    // Generate new token:
    user.token = jwtHelper.getNewToken(user);

    return user;
    }
}


async function loginAsync(credentials) {

    credentials.password = cryptoHelper.hash(credentials.password);

    // Get back all columns without password and without id:
    const sql = `SELECT user_id as id, uuid, firstName, lastName, userName FROM users WHERE userName = '${credentials.userName}' AND password = '${credentials.password}'`;
    const users = await executeAsync(sql);
    if (users.length === 0) return null;
    const user = users[0];

    // Generate new token:
    user.token = jwtHelper.getNewToken(user);

    return user;
}


module.exports = {
    registerAsync,
    loginAsync,
 
};