const express = require("express");
const authLogic = require("../business-logic/auth-logic");
const errorsHelper = require("../helpers/errors-helper");
const UserModel = require("../models/user-model")
const router = express.Router();

router.post("/register", async (request, response) => {
    try {

        const userToAdd = new UserModel(request.body);


        
        // // Validation: 
        const errors = userToAdd.validatePost();
        if (errors) return response.status(400).send(errors); // Always return validation errors to the front.



        const addedUser = await authLogic.registerAsync(userToAdd);

        if(addedUser===0){
            return response.status(401).send("User Name is already taken");
        }else{
        response.status(201).json(addedUser);
        }
    }
    catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
});

router.post("/login", async (request, response) => {
    try {
        const loggedInUser = await authLogic.loginAsync(request.body);
        if (!loggedInUser) return response.status(401).send("Incorrect username or password.");
        response.json(loggedInUser);
    }
    catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
});

module.exports = router;

