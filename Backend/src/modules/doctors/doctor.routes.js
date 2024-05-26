import express from 'express';
import bcrypt from 'bcrypt';
import 'dotenv/config'
import jwt from "jsonwebtoken";
import { validation } from '../../validation/validation.js';
import doctorModel from '../../../db/models/doctorModel.js';
import { newDoctorSchema, updateDoctorSchema } from './doctorValidation.js';

const doctorRoutes = express.Router();

const secretKey = process.env.JWT_SECRET_KEY

const generateToken = (id)=>{
    // return jwt.sign({id},secretKey);
     return jwt.sign({id},secretKey,{expiresIn:"1h"});
}

doctorRoutes.post("/doctor/signup", validation(newDoctorSchema), async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const existingDoctor = await doctorModel.findOne({ email: req.body.email });

        if (existingDoctor) {
            return res.status(400).json({ message: "doctor already registered" });
        }

        const newDoctor = await doctorModel.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            // image: req.body.image,
            // graduationInformation: req.body.graduationInformation,
            // phones: req.body.phones
        });

        res.status(201).json({ message: "doctor added", newDoctor });
    } catch (error) {
        console.error("Error adding doctor:", error);
        res.status(500).json({ message: "An error occurred while adding the doctor" });
    }
});

doctorRoutes.post("/doctor/signin", async (req, res) => {
    try {
        const { email, password } = req.body;
        const found = await doctorModel.findOne({ email });

        if (!found) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const correctPassword = await bcrypt.compare(password, found.password);

        if (!correctPassword) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const TOKEN = generateToken(found._id)

        res.header("token", TOKEN);

        res.status(200).json({ message: "doctor found", found  });
    } catch (error) {
        console.error("Error signing in doctor:", error);
        res.status(500).json({ message: "An error occurred while signing in the doctor" });
    }
});

doctorRoutes.get("/doctor/logout/:email", async (req, res) => {
    try {
        const email = req.params.email;
        const found = await doctorModel.findOne({ email });

        if (!found) {
            return res.status(404).json({ message: "Not found" });
        }

        found.TOKEN = undefined;
        await found.save();

        res.status(200).json({ message: "Doctor logged out successfully" });
    } catch (error) {
        console.error("Error logging out:", error);
        res.status(500).json({ message: "An error occurred while logging out" });
    }
});

doctorRoutes.patch("/updateDoctor/:name", validation(updateDoctorSchema), async (req, res) => {
    try {
        const found = await doctorModel.findOne({ name: req.params.name });
        
        if (!found) {
            return res.status(404).json({ message: "doctor not found" });
        }

        const correctPassword = await bcrypt.compare(req.body.password, found.password);

        if (!correctPassword) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        const hashedNewPassword = await bcrypt.hash(req.body.newPassword, 10);

        const updatedDoctor = await doctorModel.findByIdAndUpdate(found._id, {
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            // image: req.body.image,
            // graduationInformation: req.body.graduationInformation,
            // phones: req.body.phones
        }, { new: true })

        res.status(200).json({ message: "Found and updated doctor", updatedDoctor });
    } catch (error) {
        console.error("Error updating doctor:", error);
        res.status(500).json({ message: "An error occurred while updating the doctor" });
    }
});

doctorRoutes.delete("/deleteDoctor/:name", async (req, res) => {
    try {
        const name = req.params.name;
        const password = req.body.password;
        const repeatPassword = req.body.repeatPassword;

        if (password !== repeatPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        const found = await doctorModel.findOne({ name });

        if (!found) {
            return res.status(404).json({ message: "doctor not found" });
        }

        const correctPassword = await bcrypt.compare(password, found.password);

        if (!correctPassword) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        const deletedDoctor = await doctorModel.findByIdAndDelete(found._id);

        res.status(200).json({ message: "Found and deleted doctor", deletedDoctor });
    } catch (error) {
        console.error("Error deleting doctor:", error);
        res.status(500).json({ message: "An error occurred while deleting the doctor" });
    }
});

doctorRoutes.get("/getDoctorByEmail/:email", async (req, res) => {
    try {
        const email = req.params.email;
        const found = await doctorModel.findOne({ email });

        if (found) {
            return res.status(200).json({ message: "doctor found", found });
        } else {
            return res.status(404).json({ message: "doctor not found" });
        }
    } catch (error) {
        console.error("Error fetching doctor by email:", error);
        return res.status(500).json({ message: "An error occurred while fetching the doctor" });
    }
});

doctorRoutes.get("/getAllDoctors", async (req, res) => {
    try {
        const found = await doctorModel.find();

        if (found.length > 0) {
            return res.status(200).json({ message: "All doctors", doctors: found });
        } else {
            return res.status(404).json({ message: "There are no doctors" });
        }
    } catch (error) {
        console.error("Error fetching all doctors:", error);
        return res.status(500).json({ message: "An error occurred while fetching all doctors" });
    }
});

export default doctorRoutes;


