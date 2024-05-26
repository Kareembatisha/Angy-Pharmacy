import Joi from 'joi'

export const newPresriptionSchema = Joi.object({
    customerEmail: Joi.string().required(),
    message: Joi.string().required(),
    answer: Joi.string().forbidden(),
    status: Joi.string().valid("pending", "answered").default("pending").forbidden(),
})

export const updatePresriptionSchema = Joi.object({
    customerEmail: Joi.string(),
    message: Joi.string(),
    answer: Joi.string().forbidden(),
    status: Joi.string().valid("pending", "answered").forbidden(),
})