const mysql = require("mysql");
const filesHelper = require("../helpers/files-helper");
const path = require("path"); // Node.js package dealing with paths
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

async function getAllVacationsAsync() {
    const sql = `SELECT vacation_id as id , destination, description, price, DATE_FORMAT(start_date ,"%Y-%m-%d") as arrival, DATE_FORMAT(end_date ,"%Y-%m-%d") as departure, followers, imageName FROM vacations`;
    const vacations = await executeAsync(sql);
    return vacations;
}


async function getOneVacationAsync(id) {
    const sql = `SELECT vacation_id as id , destination, description, price, DATE_FORMAT(start_date ,"%Y-%m-%d") as arrival, 
    DATE_FORMAT(end_date ,"%Y-%m-%d") as departure, followers, imageName FROM vacations
    WHERE vacation_id = ${id}`;
    const vacations = await executeAsync(sql);
    return vacations[0];
}



async function addVacation(vacation) {

    const dest_new  = vacation.destination.replace('"','""');
    const desc_new = vacation.description.replace('"','""');
    
    const sql = `INSERT INTO vacations (destination, description, price, start_date, end_date, followers, imageName) 
    VALUES ("${dest_new}", "${desc_new}", ${vacation.price}, "${vacation.arrival}", "${vacation.departure}", ${0}, "${vacation.imageName}")`;

    const new_vacation = await executeAsync(sql);

    vacation.id = new_vacation.insertId;
    return vacation;
}


async function followVacation(vacation) {

    const sql = `INSERT INTO vacations_details (vacation_id, user_id) 
    VALUES (${vacation.vacation_id}, ${vacation.user_id})`;

    const new_vacation = await executeAsync(sql);

    // vacation.vacation_id = new_vacation.insertId;

    const sql1 = `UPDATE vacations SET followers = (${vacation.followers} + 1)
    WHERE vacation_id = ${vacation.vacation_id}`

    const new_followers = await executeAsync(sql1);

    return vacation;
}



async function updateVacation(vacation) {


    const vac = await getOneVacationAsync(vacation.id);
    const jsonVac = JSON.stringify(vac);
    const objVac = JSON.parse(jsonVac);
    const fileName = objVac.imageName

    const absolutePath = path.join(__dirname, "..", "images",fileName);
    filesHelper.safeDelete(absolutePath);


const destination_new  = vacation.destination.replace('"','""');
const descriptions_new = vacation.description.replace('"','""');
    const sql = `UPDATE vacations SET
            destination = "${destination_new}",
            description = "${descriptions_new}",
            price = ${vacation.price},
            start_date = "${vacation.arrival}",
            end_date = "${vacation.departure}", 
            imageName = "${vacation.imageName}" 
            WHERE vacation_id = ${vacation.id}`;
    const info = await executeAsync(sql);
    return info.affectedRows === 0 ? null : vacation;
}


async function deleteVacationAsync(id) {


    const vac1 = await getOneVacationAsync(id);
    const jsonVac = JSON.stringify(vac1);
    const objVac = JSON.parse(jsonVac);
    const fileName = objVac.imageName

    let absolutePath = path.join(__dirname, "..", "images", fileName);
    filesHelper.safeDelete(absolutePath);



    const sql1 = `DELETE FROM vacations_details WHERE vacation_id = ${id}`;
    await executeAsync(sql1);

    const sql = `DELETE FROM vacations WHERE vacation_id = ${id}`;
    const deletedVacation = await executeAsync(sql);

    return deletedVacation
}



async function unfollowVacationAsync(unfollow) {

    const sql = `DELETE FROM vacations_details WHERE vacation_id = ${unfollow.vacation_id} AND user_id = ${unfollow.user_id}`;
    const unfollow_vacation = await executeAsync(sql);


    const sql1 = `UPDATE vacations SET followers = (${unfollow.followers} - 1)
    WHERE vacation_id = ${unfollow.vacation_id}`
    const vacation_table = await executeAsync(sql1);

    return unfollow
}



async function getVacationDetails(){
    const sql = `SELECT vacations_details.vacation_id, vacations_details.user_id, vacations.followers FROM vacations_details LEFT JOIN vacations on vacations.vacation_id = vacations_details.vacation_id`
    const details = await executeAsync(sql);
    return details;
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