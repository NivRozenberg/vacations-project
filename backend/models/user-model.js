const Joi = require("joi");

class UserModel {

    constructor(user) {
        this.id = user.id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.userName = user.userName;
        this.password = user.password;
    }

    // Create post validation schema only once as a private (#) static object:
    static #postValidationSchema = Joi.object({
        id: Joi.forbidden(),
        firstName: Joi.string().required().min(2).max(100),
        lastName: Joi.string().required().min(2).max(100),
        userName: Joi.string().required().min(3).max(10000),
        password: Joi.string().required().min(3).max(10000)
    });


    validatePost() {
        const result = UserModel.#postValidationSchema.validate(this, { abortEarly: false }); // abortEarly: false --> return all validation errors and not just one.
        return result.error ? result.error.message : null; // null = no errors.
    }


}

module.exports = UserModel;
