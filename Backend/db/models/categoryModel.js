import mongoose from "mongoose";
let categorySchema = new mongoose.Schema({
    name: { type: String},
    image: { type: String },
}) 
const categoryModel = mongoose.model('Category', categorySchema)
export default categoryModel ;