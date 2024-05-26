import express from "express";
import multer from "multer";
import { validation } from "../../validation/validation.js";
import categoryModel from "../../../db/models/categoryModel.js";
import {
  newCategorySchema,
  updateCategorySchema,
} from "./categoryValidation.js";

const categoryRoutes = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

categoryRoutes.post(
  "/addCategory",
  upload.single("image"),
  validation(newCategorySchema),
  async (req, res) => {
    console.log(req.body);

    try {
      console.log(req.file);

      const name = req.body.name;
      const image = req.file
        ? "http://localhost:3000/uploads/" + req.file.filename
        : null;
      let found = await categoryModel.findOne({ name });
      if (found) {
        res.status(200).json({ message: "Category already exists" });
      } else {
        let newCategory = await categoryModel.create({
          name: name,
          image: image,
        });
        res
          .status(200)
          .json({ message: "Category Added Successfully", newCategory });
      }
    } catch (error) {
      console.log("error from back ya zmily");
      console.error("Error adding/updating category:", error);
      res.status(500).json({
        message: "An error occurred while adding/updating the category",
      });
    }
  }
);

// categoryRoutes.patch(
//   "/updateCategory/:id",
//   upload.single("image"),
//   validation(updateCategorySchema),
//   async (req, res) => {
//     console.log("req.params===========>",req.params.id); // Logging the ID parameter

//     try {
//       const name = req.params.name;
//       // const image = "http://localhost:3000/uploads/"+req.file.filename;

//       const updatedCategory = await categoryModel.findByIdAndUpdate(
//         req.params.id, // Using findByIdAndUpdate to update by ID
//         {
//           // image: image,
//           name: name,
//         },

//         { new: true }
//       );

//       if (updatedCategory) {
//         res
//           .status(200)
//           .json({ message: "Category updated successfully", updatedCategory });
//       } else {
//         res.status(404).json({ message: "Category not found" });
//       }
//     } catch (error) {
//       console.error("Error updating category:", error);
//       res
//         .status(500)
//         .json({ message: "An error occurred while updating the category" });
//     }
//   }
// );

categoryRoutes.patch(
  "/updateCategory/:id",
  upload.single("image"),
  validation(updateCategorySchema),
  async (req, res) => {
    try {
      const id = req.params.id; // Retrieve the category ID from the request parameters
      const image = req.file
        ? "http://localhost:3000/uploads/" + req.file.filename
        : null;

      // Update the category in the database using findByIdAndUpdate
      const updatedCategory = await categoryModel.findByIdAndUpdate(
        req.params.id, // Using findByIdAndUpdate to update by ID
        {
          image: image,
          name: req.body.name,
        },
        { new: true }
      );

      // Check if the category was found and updated
      if (updatedCategory) {
        res.status(200).json({
          message: "Category updated successfully",
          updatedCategory,
        });
      } else {
        // If the category was not found, return a 404 response
        res.status(404).json({ message: "Category not found" });
      }
    } catch (error) {
      // Handle any errors that occur during the update process
      console.error("Error updating category:", error);
      res.status(500).json({
        message: "An error occurred while updating the category",
      });
    }
  }
);

categoryRoutes.delete("/deleteCategory/:name", async (req, res) => {
  try {
    const name = req.params.name;
    const found = await categoryModel.findOneAndDelete({ name });

    if (found) {
      res.status(200).json({ message: "Category deleted successfully", found });
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  } catch (error) {
    console.error("Error deleting category:", error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the category" });
  }
});

categoryRoutes.get("/getAllCategories", async (req, res) => {
  try {
    const allCategories = await categoryModel.find();

    if (allCategories.length > 0) {
      res.status(200).json({ message: "Categories found", allCategories });
    } else {
      res.status(404).json({ message: "No categories found" });
    }
  } catch (error) {
    console.error("Error fetching categories:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching categories" });
  }
});

categoryRoutes.get("/getCategoryByName/:name", async (req, res) => {
  try {
    const name = req.params.name;
    const found = await categoryModel.findOne({ name });

    if (found) {
      res.status(200).json({ message: "Category found", found });
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  } catch (error) {
    console.error("Error fetching category:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching the category" });
  }
});

export default categoryRoutes;
