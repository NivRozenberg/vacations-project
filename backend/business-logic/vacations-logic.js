const vacations_dal = require("../data-access-layer/vacations-dal");




async function getAllVacationsAsync() {

    const vacations = await vacations_dal.getAllVacationsAsync();

    return vacations;
}


async function getOneVacationAsync(id) {

    const vacation = await vacations_dal.getOneVacationAsync(id);

    return vacation;
}

async function addVacation(new_vacation) {

    const vacations = await vacations_dal.addVacation(new_vacation);

    return vacations;
}


async function followVacation(followed_vacation) {

    const vacations = await vacations_dal.followVacation(followed_vacation);

    return vacations;
}


async function updateVacation(vacation) {
    const updatedVacation = await vacations_dal.updateVacation(vacation);
    return updatedVacation;
}


async function deleteVacationAsync(id) {
    const deletedVacation = await vacations_dal.deleteVacationAsync(id);
    return deletedVacation;

}



async function unfollowVacationAsync(unfollow) {
    const deletedVacation = await vacations_dal.unfollowVacationAsync(unfollow);
    return deletedVacation;
}


async function getVacationDetails() {
    const deletedVacation = await vacations_dal.getVacationDetails();
    return deletedVacation;
}


module.exports = {
    getAllVacationsAsync,
    getOneVacationAsync,
    addVacation,
    updateVacation,
    deleteVacationAsync,
    followVacation,
    unfollowVacationAsync,
    getVacationDetails
};