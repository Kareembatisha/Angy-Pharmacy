import Joi from 'joi'

const itemSchema = Joi.object({
    itemId: Joi.string().required(),
    quantity: Joi.number(),
});

export const newCartSchema = Joi.object({
    customerId: Joi.string().required(),
    items: Joi.array().items(itemSchema)
});

export const updateCartSchema = Joi.object({
    customerId: Joi.string().forbidden(),
    items: Joi.array().items(itemSchema)
});