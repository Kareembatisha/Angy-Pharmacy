import mongoose from "mongoose";
let serviceSchema = new mongoose.Schema({
    name: { type: String},
    price: { type: Number}
}) 
const serviceModel = mongoose.model('Service', serviceSchema)
export default serviceModel ;