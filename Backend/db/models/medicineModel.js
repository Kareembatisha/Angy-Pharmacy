import mongoose from "mongoose";
let medicineSchema = new mongoose.Schema({
    name: { type: String},
    price: { type: Number },
    image: { type: String },
    mfgDate: { type: Date },
    expDate: { type: Date },
    company: { type: String },
    activeSubstance: [{ type: String }],
    category: { type: String },
    stock: { type: Number },
}) 
const medicineModel = mongoose.model('Medicine', medicineSchema)
export default medicineModel ;