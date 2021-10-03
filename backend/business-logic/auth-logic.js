const auth_dal = require("../data-access-layer/auth-dal");
const cryptoHelper = require("../helpers/crypto-helper");
const uuid = require("uuid"); // npm i uuid
const jwtHelper = require("../helpers/jwt-helper");

async function registerAsync(user) {

    const new_user = await auth_dal.registerAsync(user);

    return new_user;
}

async function loginAsync(credentials) {

    const user = await auth_dal.loginAsync(credentials);

    return user;
}


// async function loginAsync(credentials) {

//     credentials.password = cryptoHelper.hash(credentials.password);

//     // Get back all columns without password and without id:
//     const sql = `SELECT uuid, firstName, lastName, userName FROM users WHERE userName = '${credentials.userName}' AND password = '${credentials.password}'`;
//     const users = await auth_dal.executeAsync(sql);
//     if (users.length === 0) return null;
//     const user = users[0];

//     // Generate new token:
//     user.token = jwtHelper.getNewToken(user);

//     return user;
// }

module.exports = {
    registerAsync,
    loginAsync
};