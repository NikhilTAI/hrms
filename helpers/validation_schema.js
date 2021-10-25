const Joi = require('joi');

const userValidSchema = Joi.object({
    username : Joi.required(),
    email: Joi.string().email({ tlds: { allow: false } }).lowercase().required(),
})

const devValidSchema = Joi.object({
    id: Joi.required(),
    taskList: Joi.required(),
    taskDesc: Joi.required(),
    hourSpent: Joi.number().required(),
    status: Joi.required()
})

const bdeValidSchema = Joi.object({
    id: Joi.required(),
    taskList: Joi.required(),
    number: Joi.number().required(),
    hourSpent: Joi.number().required(),
})

module.exports = {
    userValidSchema,
    devValidSchema,
    bdeValidSchema
}