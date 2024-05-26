import express from 'express';
import { validation } from '../../validation/validation.js';
import { newPresriptionSchema, updatePresriptionSchema } from './prescriptionValidation.js';
import prescriptionModel from '../../../db/models/prescriptionModel.js';
import customerModel from '../../../db/models/customerModel.js';

const prescriptionRoutes = express.Router();

prescriptionRoutes.post("/addPrescription", validation(newPresriptionSchema), async (req, res) => {
    try {
        const { customerEmail, message } = req.body;
        const customer = await customerModel.findOne({ email: customerEmail });

        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }

        const newPrescription = await prescriptionModel.create({
            customerEmail,
            message,
            status: "pending"
        });

        res.status(200).json({ message: "Prescription added successfully", newPrescription });
    } catch (error) {
        console.error("Error adding Prescription:", error);
        res.status(500).json({ message: "An error occurred while adding the Prescription" });
    }
});

prescriptionRoutes.patch("/updatePrescription/:id", validation(updatePresriptionSchema), async (req, res) => {
    try {
        const prescriptionId = req.params.id;
        const { message } = req.body;

        const updatedPrescription = await prescriptionModel.findByIdAndUpdate(prescriptionId, { message }, { new: true });

        if (updatedPrescription) {
            res.status(200).json({ message: "Prescription updated successfully", updatedPrescription });
        } else {
            res.status(404).json({ message: "Prescription not found" });
        }
    } catch (error) {
        console.error("Error updating Prescription:", error);
        res.status(500).json({ message: "An error occurred while updating the Prescription" });
    }
});

prescriptionRoutes.delete("/deletePrescription/:id", async (req, res) => {
    try {
        const prescriptionId = req.params.id;
        const deletedPrescription = await prescriptionModel.findByIdAndDelete(prescriptionId);

        if (deletedPrescription) {
            res.status(200).json({ message: "Prescription deleted successfully", deletedPrescription });
        } else {
            res.status(404).json({ message: "Prescription not found" });
        }
    } catch (error) {
        console.error("Error deleting Prescription:", error);
        res.status(500).json({ message: "An error occurred while deleting the Prescription" });
    }
});

prescriptionRoutes.get("/getAllPrescriptions", async (req, res) => {
    try {
        const allPrescriptions = await prescriptionModel.find();

        if (allPrescriptions.length > 0) {
            res.status(200).json({ message: "Prescriptions found", allPrescriptions });
        } else {
            res.status(404).json({ message: "No Prescriptions found" });
        }
    } catch (error) {
        console.error("Error fetching Prescriptions:", error);
        res.status(500).json({ message: "An error occurred while fetching Prescriptions" });
    }
});

prescriptionRoutes.get("/getUnansweredPrescriptions", async (req, res) => {
    try {
        const unansweredPrescriptions = await prescriptionModel.find({ status: "pending" });

        if (unansweredPrescriptions.length > 0) {
            res.status(200).json({ message: "Unanswered Prescriptions found", unansweredPrescriptions });
        } else {
            res.status(404).json({ message: "No Unanswered Prescriptions found" });
        }
    } catch (error) {
        console.error("Error fetching Unanswered Prescriptions:", error); 
        res.status(500).json({ message: "An error occurred while fetching Unanswered Prescriptions" });
    }
});

prescriptionRoutes.get("/getAllPrescriptionsByCustomerEmail/:email", async (req, res) => {
    try {
        const customerEmail = req.params.email;
        const prescriptions = await prescriptionModel.find({ customerEmail });

        if (prescriptions.length > 0) {
            res.status(200).json({ message: "Prescriptions found for the customer", prescriptions });
        } else {
            res.status(404).json({ message: "No Prescriptions found for the customer" });
        }
    } catch (error) {
        console.error("Error fetching Prescriptions by Customer Email:", error);   
        res.status(500).json({ message: "An error occurred while fetching Prescriptions" });
    }
});

prescriptionRoutes.patch("/answerPrescription/:id", async (req, res) => {
    try {
        const prescriptionId = req.params.id;
        const { answer } = req.body;

        const answeredPrescription = await prescriptionModel.findByIdAndUpdate(prescriptionId, { answer, status: "answered" , answeredAt: new Date()}, { new: true });

        if (answeredPrescription) {
            res.status(200).json({ message: "Prescription answered successfully", answeredPrescription });
        } else {
            res.status(404).json({ message: "Prescription not found" });
        }
    } catch (error) {
        console.error("Error answering Prescription:", error);
        res.status(500).json({ message: "An error occurred while answering the Prescription" });
    }
});

export default prescriptionRoutes;
