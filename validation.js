const Joi = require('@hapi/joi');


const register_validation =Joi.object( {

    name:Joi.string().required().min(6),
    password:Joi.string().required().min(6),
    email:Joi.string().email()


});

const login_validation = Joi.object({
    email:Joi.string().email(),
    password:Joi.string().required().min(6)
   
})

module.exports.register_validation = register_validation;

module.exports.login_validation = login_validation;