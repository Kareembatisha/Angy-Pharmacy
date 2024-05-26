import Joi from "joi";

export const newMedicineSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().min(0).required(),
  image: Joi.string(),
  mfgDate: Joi.date().required(),
  expDate: Joi.date().required(),
  company: Joi.string().required(),
  activeSubstance: Joi.string(),
  category: Joi.string().required(),
  stock: Joi.number().integer().min(0).required(),
});

// export const updateMedicineSchema = Joi.object({
//     name: Joi.string(),
//     price: Joi.number().min(0),
//     image: Joi.string().uri(),
//     mfgDate: Joi.forbidden(),
//     expDate: Joi.forbidden(),
//     company: Joi.string(),
//     activeSubstance: Joi.forbidden(),
//     category: Joi.forbidden(),
//     stock: Joi.number().integer().min(0),  
// })
export const updateMedicineSchema = Joi.object({
  name: Joi.string(),
  price: Joi.number().min(0),
  company: Joi.string(),
  stock: Joi.number().integer().min(0),
  image: Joi.string().optional(), // Allow image to be optional
  mfgDate: Joi.date().optional(), // Allow mfgDate to be optional
  expDate: Joi.date().optional(), // Allow expDate to be optional
  activeSubstance: Joi.string().optional(), // Allow activeSubstance to be optional
  category: Joi.string().optional(), // Allow category to be optional
});
