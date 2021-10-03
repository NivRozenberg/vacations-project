const mysql = require("mysql");
const uuid = require("uuid"); // npm i uuid
const cryptoHelper = require("../helpers/crypto-helper");
const jwtHelper = require("../helpers/jwt-helper");

const connection = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "project3db"
});

function executeAsync(sql) {
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
}

// get user by uuid and not by id:
async function getOneUserAsync(uuid) {

    // Get all columns without password:
    const sql = `SELECT user_id as id, uuid, firstName, lastName, username FROM users WHERE uuid = '${uuid}'`;
    
    const users = await executeAsync(sql);
    return users[0];
}


async function updateUserAsync(user) {
    const sql = `UPDATE users SET firstName = '${user.firstName}', lastName = '${user.lastName}', username = '${user.username}' WHERE uuid = '${user.uuid}'`;
    const info = await executeAsync(sql);
    return info.affectedRows === 0 ? null : user;
}



module.exports = {
    getOneUserAsync,
    updateUserAsync
};