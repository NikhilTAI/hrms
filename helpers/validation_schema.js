const Joi = require('joi');

const devSchema = Joi.object({
    taskList: Joi.required(),
    taskDesc: Joi.required(),
    hourSpent: Joi.number().required(),
    status: Joi.required()
})

const bdeSchema = Joi.object({
    taskList: Joi.required(),
    number: Joi.number().required(),
    hourSpent: Joi.number().required(),
})

module.exports = {
    devSchema,
    bdeSchema
}