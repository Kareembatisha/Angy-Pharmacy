import Joi from 'joi'

export const newDoctorSchema = Joi.object({
    name:Joi.string().min(3).max(20).required(),
    email:Joi.string().required(),
    password:Joi.string().min(8).max(20).required(),
//     image:Joi.string().uri().required(),
//     graduationInformation: Joi.object({
//         city: Joi.string().required(),
//         university: Joi.string().required(),
//         faculty: Joi.string().required(),
//         year: Joi.number().max(2024).min(1950).required(),   
//     }).required(),
//     phones:Joi.array().items(Joi.string().regex(/^01[0125][0-9]{8}$/)).required()
})

export const updateDoctorSchema = Joi.object({
    name:Joi.string(),
    email:Joi.string().forbidden(),//متحطهمش فى الموديل بتاع ال update
    password:Joi.string().min(8).max(20).required(),
    newPassword:Joi.string().min(8).max(20),
    // graduationInformation: Joi.object({
    //     city: Joi.string().required(),
    //     university: Joi.string().required(),
    //     faculty: Joi.string().required(),
    //     year: Joi.string().max(2024).min(1950).required(),
    // }),
    // phones:Joi.array().items(Joi.string().regex(/^01[0125][0-9]{8}$/))
})
