const express = require("express");
const vacationsLogic = require("../business-logic/vacations-logic");
const errorsHelper = require("../helpers/errors-helper");
const verifyLoggedIn = require("../middleware/verify-logged-in");
const router = express.Router();
const fileUpload = require("express-fileupload"); // npm i express-fileupload
const { followVacation } = require("../data-access-layer/vacations-dal");
const VacationModel = require("../models/vacation-model")
const fs = require("fs");
const path = require("path"); // Node.js package dealing with paths
const uuid = require("uuid"); // npm i uuid

// // Block this entire controller to anonymous users:
// router.use(verifyLoggedIn); // משתמשים במידלוור

// // Handle files send to our backend:
router.use(fileUpload()); // Place the given files in request.files collection


router.get("/", verifyLoggedIn, async (request, response) => {
    try {
        const vacations = await vacationsLogic.getAllVacationsAsync();
        response.json(vacations);
    }
    catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
});

router.get("/foreign", async (request, response) => {
    try {
        const vacations = await vacationsLogic.getVacationDetails();
        response.json(vacations);
    }
    catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
});








router.get("/:id", verifyLoggedIn, async (request, response) => {
    try {
        const id = +request.params.id;
        const vacation = await vacationsLogic.getOneVacationAsync(id);
        if (!vacation) return response.status(404).send(`id ${id} not found.`);
        response.json(vacation);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});





router.post("/", async (request, response) => {
    try {

        // const new_vacation = request.body; // vacationModel from client
        const new_vacation = new VacationModel(request.body);

        // const new_vacation = new VacationModel(request.body);
        // // new_vacation.id = id; // Insert the route id into the body object!

        // Validation: 
        const errors = new_vacation.validatePost();
        if (errors) return response.status(400).send(errors); // Always return validation errors to the front.


        console.log(request.files)

        // If user didn't sent any file to this route
        if (!request.files) return response.status(400).send("No image sent!");

        // Take the sent image: 
        const image = request.files.image; // coolPicture is the name given to the <input> tag

        // If user sent some other name - send back 400 status:
        if (!image) return response.status(400).send("No picture sent!");

        // Find the image extension: 
        const extension = image.name.substr(image.name.lastIndexOf(".")); // .jpg / .png / .gif

        // Create new file name:
        const newFileName = uuid.v4() + extension;
        new_vacation.imageName = newFileName
        // Saves the image file to the disk:
        await image.mv("./images/" + newFileName); // mv = move

        // Redirect to index.html:
        // response.redirect("/");


        // const new_vacation = new vacationModel();
        const new_dal_vacation = await vacationsLogic.addVacation(new_vacation);

        // The image placed by express-fileupload in request.files

        response.status(201).json(new_dal_vacation);
    } catch (err) {
        response.status(500).send(err.message);
    }
});



router.get("/images/:name", (request, response) => {
    try {
        const name = request.params.name;
        let absolutePath = path.join(__dirname, "..", "images", name);
        if (!fs.existsSync(absolutePath)) {
            absolutePath = path.join(__dirname, "..", "images", "not-found.jpg");
        }
        response.sendFile(absolutePath);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});



router.post("/follow", async (request, response) => {
    try {


        const followed_vacation = request.body; // vacationModel from client
        const new_followed_dal_vacation = await vacationsLogic.followVacation(followed_vacation);

        response.status(201).json(new_followed_dal_vacation);
    } catch (err) {
        response.status(500).send(err.message);
    }
});



// Patch http://localhost:3001/api/vacation/7     7 is a vacation id
router.put("/:id", async (request, response) => {
    try {
        const id = +request.params.id;

        const vacation = new VacationModel(request.body);
        vacation.id = id; // Insert the route id into the body object!

        // Validation: 
        const errors = vacation.validatePut();
        if (errors) return response.status(400).send(errors); // Always return validation errors to the front.


        // uploadImage(vacation);

         // If user didn't sent any file to this route
         if (!request.files) return response.status(400).send("No image sent!");

         // Take the sent image: 
         const image = request.files.image; // coolPicture is the name given to the <input> tag
 
         // If user sent some other name - send back 400 status:
         if (!image) return response.status(400).send("No picture sent!");
 
         // Find the image extension: 
         const extension = image.name.substr(image.name.lastIndexOf(".")); // .jpg / .png / .gif
 
         // Create new file name:
         const newFileName = uuid.v4() + extension;
         vacation.imageName = newFileName
         // Saves the image file to the disk:
         await image.mv("./images/" + newFileName); // mv = move

        const updatedVacation = await vacationsLogic.updateVacation(vacation);
        if (!vacation) return response.status(404).send(`id ${id} not found.`);

        response.json(updatedVacation);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// DELETE http://localhost:3001/api/products/7     7 is a product id
router.delete("/:id", async (request, response) => {
    try {
        const id = +request.params.id;
        await vacationsLogic.deleteVacationAsync(id);
        response.sendStatus(204);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});


// DELETE http://localhost:3001/api/products/7     7 is a product id
router.post("/unfollow", async (request, response) => {
    try {
        const followed_vacation = request.body; // vacationModel from client

        console.log(followed_vacation);
        const new_followed_dal_vacation = await vacationsLogic.unfollowVacationAsync(followed_vacation);

        response.status(201).json(new_followed_dal_vacation);
    } catch (err) {
        response.status(500).send(err.message);
    }
});




module.exports = router;