const users_dal = require("../data-access-layer/users-dal");

// get user by uuid and not by id:
async function getOneUserAsync(uuid) {

    const user = await users_dal.getOneUserAsync(uuid);

    return user;
}

async function updateUserAsync(user) {
    const updated_user = await users_dal.updateUserAsync(user);

    return updated_user;
}

module.exports = {
    getOneUserAsync,
    updateUserAsync
};