import express from 'express';
import { validation } from '../../validation/validation.js';
import { newOrderSchema, updateOrderSchema } from './orderValidation.js';
import orderModel from '../../../db/models/orderModel.js';
import medicineModel from '../../../db/models/medicineModel.js';

const orderRoutes = express.Router();


orderRoutes.post("/addOrder", validation(newOrderSchema), async (req, res) => {
    try {
        const { customerEmail, items, address, total } = req.body;
        let status = "pending";
        const newOrder = await orderModel.create({ customerEmail, items, address, total, status });
        res.status(201).json({ message: "Order added successfully", newOrder });
    } catch (error) {
        console.error("Error adding order:", error);
        res.status(500).json({ message: "An error occurred while adding the order" });
    }
});

orderRoutes.patch("/updateOrder/:orderId", validation(updateOrderSchema), async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const { items, total } = req.body;
        const updatedOrder = await orderModel.findByIdAndUpdate(orderId, { items, total }, { new: true });
        if (updatedOrder) {
            res.status(200).json({ message: "Order updated successfully", updatedOrder });
        } else {
            res.status(404).json({ message: "Order not found" });
        }
    } catch (error) {
        console.error("Error updating order:", error);
        res.status(500).json({ message: "An error occurred while updating the order" });
    }
});

orderRoutes.delete("/deleteOrder/:orderId", async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const deletedOrder = await orderModel.findByIdAndDelete(orderId);
        if (deletedOrder) {
            res.status(200).json({ message: "Order deleted successfully", deletedOrder });
        } else {
            res.status(404).json({ message: "Order not found" });
        }
    } catch (error) {
        console.error("Error deleting order:", error);
        res.status(500).json({ message: "An error occurred while deleting the order" });
    }
});

orderRoutes.get("/getAllOrders", async (req, res) => {
    try {
        const allOrders = await orderModel.find().lean();
        if (allOrders.length > 0) {
            res.status(200).json({ message: "Orders found", allOrders });
        } else {
            res.status(404).json({ message: "No orders found" });
        }
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ message: "An error occurred while fetching orders" });
    }
});

orderRoutes.get("/getOrderById/:orderId", async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const foundOrder = await orderModel.findById(orderId);
        if (foundOrder) {
            res.status(200).json({ message: "Order found", foundOrder });
        } else {
            res.status(404).json({ message: "Order not found" });
        }
    } catch (error) {
        console.error("Error fetching order:", error);
        res.status(500).json({ message: "An error occurred while fetching the order" });
    }
});

orderRoutes.get("/getAllOrdersByCustomerId/:email", async (req, res) => {
    try {
        const customerEmail = req.params.email;
        const allOrders = await orderModel.find({ customerEmail }).lean();
        if (allOrders.length > 0) {
            res.status(200).json({ message: "Orders found", allOrders });
        } else {
            res.status(404).json({ message: "No orders found for this customer" });
        }
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ message: "An error occurred while fetching orders" });
    }
});


orderRoutes.patch("/acceptOrder/:orderId", async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const updatedOrder = await orderModel.findByIdAndUpdate(orderId, { status: "accepted" ,message:"Order was accepted and will be shipped soon" , acceptedOrDeniedAt: new Date()}, { new: true });
        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }
        
        const items = updatedOrder.items;
        
        for (const item of items) {
            const name = item.name;
            const quantity = item.quantity;
            const medicine = await medicineModel.findOne({name});
            if (!medicine) {
                return res.status(404).json({ message: "Medicine not found" });
            }
            medicine.stock -= quantity;
            await medicine.save();
        }
        
        res.status(200).json({ message: "Order accepted successfully", updatedOrder });
    } catch (error) {
        console.error("Error accepting order:", error);
        res.status(500).json({ message: "An error occurred while accepting the order" });
    }
});

orderRoutes.patch("/denyOrder/:orderId", async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const updatedOrder = await orderModel.findByIdAndUpdate(orderId, { status: "denied",message:"Sorry order was denied because of some technical issues" , acceptedOrDeniedAt: new Date()}, { new: true });
        if (updatedOrder) {
            res.status(200).json({ message: "Order denied successfully", updatedOrder });
        } else {
            res.status(404).json({ message: "Order not found" });
        }
    } catch (error) {
        console.error("Error denying order:", error);
        res.status(500).json({ message: "An error occurred while denying the order" });
    }
});

export default orderRoutes;