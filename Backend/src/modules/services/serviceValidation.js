import Joi from 'joi'

export const newServiceSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().min(0).required(),
})

export const updateServiceSchema = Joi.object({
    name: Joi.string(),
    price: Joi.number().min(0)

})