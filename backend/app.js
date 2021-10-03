global.config = require(process.env.NODE_ENV === "production"? "./config-prod.json": "./config-dev.json");
// const fileUpload = require("express-fileupload"); // npm i express-fileupload
// global.config = require("./global.json")
const fs = require("fs");
const express = require("express");
const cors = require("cors");
const authController = require("./controllers/auth-controller");
const vacationsController = require("./controllers/vacations-controller");
const usersController = require("./controllers/users-controller");
const socketLogic = require("./socket-logic");

const server = express();


// Handle files send to our backend:
// server.use(fileUpload()); // Place the given files in request.files collection

// Create images folder if not exists: 
if (!fs.existsSync("./images")) fs.mkdirSync("./images");


server.use(express.json());
server.use(cors());

server.use("/api/auth", authController);
server.use("/api/vacations", vacationsController);
server.use("/api/users", usersController);

// server.use("*", (request, response) => response.status(404).send("Route not found."));

// server.listen(3001, () => console.log("Listening..."));
const listener = server.listen(3001, () => console.log("Listening..."));
socketLogic.start(listener);