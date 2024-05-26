import mongoose from "mongoose";
let prescriptionSchema = new mongoose.Schema({
   customerEmail:{type : String},
   message: {type : String},
   answer: {type : String},
   status: {type : String},
   answeredAt: { type: Date, default: null }
}) 
prescriptionSchema.index({ answeredAt: 1 }, { expireAfterSeconds: 86400 }); 
const prescriptionModel = mongoose.model('Prescription', prescriptionSchema)
export default prescriptionModel ;