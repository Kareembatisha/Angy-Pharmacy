import express from 'express';
import cartModel from '../../../db/models/cartModel.js';
import { validation } from '../../validation/validation.js';
import { newCartSchema, updateCartSchema } from './cartValidation.js';

const cartRoutes = express.Router();

cartRoutes.post("/addCart", validation(newCartSchema), async (req, res) => {
    try {
        const { customerId, items } = req.body;
        const newCart = await cartModel.create({ customerId, items });
        res.status(201).json({ message: "Cart added successfully", newCart });
    } catch (error) {
        console.error("Error adding cart:", error);
        res.status(500).json({ message: "An error occurred while adding the cart" });
    }
});

cartRoutes.patch("/updateCart/:customerId", validation(updateCartSchema), async (req, res) => {
    try {
        const { customerId } = req.params;
        const { items } = req.body;
        const updatedCart = await cartModel.findOneAndUpdate(
            { customerId },
            { items },
            { new: true }
        );
        if (updatedCart) {
            res.status(200).json({ message: "Cart updated successfully", updatedCart });
        } else {
            res.status(404).json({ message: "Cart not found" });
        }
    } catch (error) {
        console.error("Error updating cart:", error);
        res.status(500).json({ message: "An error occurred while updating the cart" });
    }
});

cartRoutes.delete("/deleteCart/:customerId", async (req, res) => {
    try {
        const { customerId } = req.params;
        const deletedCart = await cartModel.findOneAndDelete({ customerId });
        if (deletedCart) {
            res.status(200).json({ message: "Cart deleted successfully", deletedCart });
        } else {
            res.status(404).json({ message: "Cart not found" });
        }
    } catch (error) {
        console.error("Error deleting cart:", error);
        res.status(500).json({ message: "An error occurred while deleting the cart" });
    }
});

cartRoutes.get("/getAllCarts", async (req, res) => {
    try {
        const allCarts = await cartModel.find();
        if (allCarts.length > 0) {
            res.status(200).json({ message: "Carts found", allCarts });
        } else {
            res.status(404).json({ message: "No carts found" });
        }
    } catch (error) {
        console.error("Error fetching carts:", error);
        res.status(500).json({ message: "An error occurred while fetching carts" });
    }
});

cartRoutes.get("/getCartByCustomerId/:customerId", async (req, res) => {
    try {
        const { customerId } = req.params;
        const foundCart = await cartModel.findOne({ customerId });
        if (foundCart) {
            res.status(200).json({ message: "Cart found", foundCart });
        } else {
            res.status(404).json({ message: "Cart not found" });
        }
    } catch (error) {
        console.error("Error fetching cart:", error);
        res.status(500).json({ message: "An error occurred while fetching the cart" });
    }
});

export default cartRoutes;
