import Joi from 'joi';

const itemSchema = Joi.object({
    name: Joi.string().required(),
    quantity: Joi.number().required()
});

export const newOrderSchema = Joi.object({
    customerEmail: Joi.string().required(),
    items: Joi.array().items(itemSchema.required()),
    address: Joi.string().required(),
    message: Joi.string().forbidden(),
    total: Joi.number().required(),
    status: Joi.string().valid("pending", "approved", "denied").default("pending").forbidden(),
});

export const updateOrderSchema = Joi.object({
    customerEmail: Joi.string().forbidden(),
    items: Joi.array().items(itemSchema.required()),
    total: Joi.number(),
    message: Joi.string().forbidden(),
    address: Joi.string(),
    status: Joi.string().valid("pending", "approved", "denied").forbidden(),
});
