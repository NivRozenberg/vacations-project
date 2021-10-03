const Joi = require("joi");

class VacationModel {

    constructor(vacation) {
        this.id = vacation.id;
        this.destination = vacation.destination;
        this.description = vacation.description;
        this.price = vacation.price;
        this.arrival = vacation.arrival;
        this.departure = vacation.departure;
        this.followers = vacation.followers;
        this.imageName = vacation.imageName;
    }


    static #postValidationSchema = Joi.object({
        id: Joi.forbidden(),
        destination: Joi.string().required().min(2).max(100),
        description: Joi.string().required().min(2).max(1000),
        price: Joi.number().required().min(0).max(10000),
        arrival: Joi.string().required().min(3).max(15),
        departure: Joi.string().required().min(3).max(15),
        followers: Joi.number().min(0),
        imageName: Joi.string().min(0).max(10000),
    });


    static #putValidationSchema = Joi.object({
        id: Joi.number().required().positive().integer(),
        destination: Joi.string().required().min(2).max(100),
        description: Joi.string().required().min(2).max(1000),
        price: Joi.number().required().min(0).max(10000),
        arrival: Joi.string().required().min(3).max(15),
        departure: Joi.string().required().min(3).max(15),
        followers: Joi.number().min(0),
        imageName: Joi.string().min(0).max(10000),
    });

    validatePost() {
        const result = VacationModel.#postValidationSchema.validate(this, { abortEarly: false }); // abortEarly: false --> return all validation errors and not just one.
        return result.error ? result.error.message : null; // null = no errors.
    }

    validatePut() {
        const result = VacationModel.#putValidationSchema.validate(this, { abortEarly: false }); // abortEarly: false --> return all validation errors and not just one.
        return result.error ? result.error.message : null; // null = no errors.
    }
}
module.exports = VacationModel;