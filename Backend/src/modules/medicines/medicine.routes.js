import express from "express";
import multer from "multer";
import {
  newMedicineSchema,
  updateMedicineSchema,
} from "./medicine.validation.js";
import medicineModel from "../../../db/models/medicineModel.js";
import { validation } from "../../validation/validation.js";
import "dotenv/config";
import categoryModel from "../../../db/models/categoryModel.js";

const medicineRoutes = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

medicineRoutes.post(
  "/addMedicine",
  upload.single("image"),
  validation(newMedicineSchema), // Ensure multer middleware is used before the route handler

  async (req, res) => {
    // console.log(req.body);
    try {
      // Check if a file was uploaded
      // console.log(req.file);
      // console.log(req);

      const image = req.file
        ? "http://localhost:3000/uploads/" + req.file.filename
        : null;

      // console.log(image);

      const categoryName = await categoryModel.find({
        name: req.body.category,
      });
      if (!categoryName) {
        res.status(404).json({ message: "Category not found" });
      }
      let found = await medicineModel.findOne({ name: req.body.name });
      if (found) {
        res.status(403).json({ message: "Medicine already exists" });
      }
      const newMedicine = await medicineModel.create({
        name: req.body.name,
        price: req.body.price,
        //
        mfgDate: req.body.mfgDate,
        expDate: req.body.expDate,
        company: req.body.company,
        activeSubstance: req.body.activeSubstance,
        category: req.body.category,
        stock: req.body.stock,
        image: image, // Assign the image variable here
      });

      res

        .status(201)
        .json({ message: "Medicine added successfully", newMedicine });
      console.log("dddjdjj");
    } catch (error) {
      console.error("Error adding medicine:", error);
      res
        .status(500)
        .json({ message: "An error occurred while adding the medicine" });
    }
  }
);

medicineRoutes.put(
  "/updateMedicine/:id",
  upload.single("image"),
  validation(updateMedicineSchema),
  async (req, res) => {
    console.log(req.params.id); // Logging the ID parameter
    try {
      const image = req.file
        ? "http://localhost:3000/uploads/" + req.file.filename
        : null;
      // console.log(image);
      // console.log(req.body);

      const found = await medicineModel.findByIdAndUpdate(
        req.params.id, // Using findByIdAndUpdate to update by ID
        {
          image: image,
          name: req.body.name,
          price: req.body.price,
          company: req.body.company,
          stock: req.body.stock,
        },
        { new: true }
      );

      if (found) {
        res.json({ message: "Medicine updated successfully", found });
      } else {
        res.status(404).json({ message: "Medicine not found" });
      }
    } catch (error) {
      console.error("Error updating medicine:", error);
      res
        .status(500)
        .json({ message: "An error occurred while updating the medicine" });
    }
  }
);

medicineRoutes.delete("/deleteMedicine/:name", async (req, res) => {
  try {
    const name = req.params.name;
    const found = await medicineModel.findOneAndDelete({ name: name });

    if (found) {
      res.status(200).json({ message: "Medicine deleted successfully", found });
    } else {
      res.status(404).json({ message: "Medicine not found" });
    }
  } catch (error) {
    console.error("Error deleting medicine:", error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the medicine" });
  }
});

medicineRoutes.get("/getAllMedicines", async (req, res) => {
  try {
    const allMedicines = await medicineModel.find().lean();

    if (allMedicines.length > 0) {
      res.json({ message: "Medicines found", allMedicines });
    } else {
      res.status(404).json({ message: "No medicines found" });
    }
  } catch (error) {
    console.error("Error fetching medicines:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching medicines" });
  }
});

medicineRoutes.get("/getMedicineByName/:name", async (req, res) => {
  try {
    const name = req.params.name;
    const found = await medicineModel.findOne({
      name: { $regex: new RegExp(name, "i") },
    });

    if (found) {
      res.json({ message: "Medicine found", found });
    } else {
      res.status(404).json({ message: "Medicine not found" });
    }
  } catch (error) {
    console.error("Error fetching medicine:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching the medicine" });
  }
});

medicineRoutes.get("/getMedicineByCategory/:category", async (req, res) => {
  try {
    const category = req.params.category;
    const found = await medicineModel.find({
      category: { $regex: new RegExp(category, "i") },
    });

    if (found.length > 0) {
      res.json({ message: "Medicines found", found });
    } else {
      res
        .status(404)
        .json({ message: "No medicines found for the specified category" });
    }
  } catch (error) {
    console.error("Error fetching medicines by category:", error);
    res.status(500).json({
      message: "An error occurred while fetching medicines by category",
    });
  }
});

export default medicineRoutes;
