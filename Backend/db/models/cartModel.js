import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    itemID: { type: String, required: true },
    quantity: { type: Number, required: true },
});

let cartSchema = new mongoose.Schema({
    CustomerID: {type: mongoose.Schema.Types.ObjectId},
    items: [{type: itemSchema}],
}) 

const cartModel = mongoose.model('Cart', cartSchema)
export default cartModel ;