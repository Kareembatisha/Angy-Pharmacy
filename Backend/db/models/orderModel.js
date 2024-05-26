import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    name: { type: String },
    quantity: { type: Number }, 
});

const orderSchema = new mongoose.Schema({
    customerEmail: { type: String },
    items: [{ type: itemSchema }],
    address:{ type :String },
    total: { type: Number },
    status: { type: String },
    message: { type: String },
    acceptedOrDeniedAt: { type: Date, default: null }
});

orderSchema.index({ acceptedOrDeniedAt: 1 }, { expireAfterSeconds: 60 }); 

export default mongoose.model('Order', orderSchema);

