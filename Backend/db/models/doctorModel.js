import mongoose from "mongoose";

// const gradInfo = new mongoose.Schema({
//     city: { type: String, required: true },
//     university: { type: String, required: true },
//     faculty: { type: String, required: true },
//     year: { type: Number, required: true}
// });

let doctorSchema = new mongoose.Schema({
    name: { type: String},
    email: { type: String },
    password: { type: String },
    // image: { type: String },
    // graduationInformation: { type: gradInfo },
    // phones: [{ type: String }],
}) 
const doctorModel = mongoose.model('Doctor', doctorSchema)
export default doctorModel ;