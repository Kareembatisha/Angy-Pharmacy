import Joi from 'joi'

export const newCustomerSchema = Joi.object({
    name:Joi.string().min(3).max(20).required(),
    email:Joi.string().required(),
    password:Joi.string().min(5).max(20).required(),
    address: Joi.string().required(),
    phone:Joi.string().regex(/^01[0125][0-9]{8}$/).required(),
})

export const updateCustomerSchema = Joi.object({
    name:Joi.string(),
    email:Joi.string().forbidden(),//متحطهمش فى الموديل بتاع ال update
    password:Joi.string().min(8).max(20).required(),
    newPassword:Joi.string().min(8).max(20),
    address: Joi.string(),
    phone:Joi.string().regex(/^01[0125][0-9]{8}$/),

})