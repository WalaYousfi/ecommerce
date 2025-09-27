import { categoryModel } from "../../../models/category.model.js";
import slugify from "slugify";

const getAllCategories = async (req, res) => {
  let results = await categoryModel.find({});
  if (results) return res.status(200).json({ message: "success", results });
  else res.status(404).json({ error: "not found " });
};

const getCategoryById = async (req, res) => {
  let { id } = req.params;
  let results = await categoryModel.findById(id);
  if (results) return res.status(200).json({ message: "success", results });
  else res.status(404).json({ error: "not found " });
};

const createCategory = async (req, res) => {
  let { name } = req.body;
  let results = new categoryModel({ name, slug: slugify(name) });
  await results.save();
  res.status(201).json({ message: "category added successfully" });
};

const updateCategory = async (req, res) => {
  let { id } = req.params;
  let { name } = req.body;
  let results = await categoryModel.findByIdAndUpdate(
    id,
    {
      name,
      slug: slugify(name),
    },
    { new: true }
  );

  !results && res.status(404).json({ error: "category not found " });
  results && res.status(200).json({ message: "updated successfully", results });
};

const deleteCategory = async (req, res) => {
  let { id } = req.params;
  let results = await categoryModel.findByIdAndDelete(id);
  !results && res.status(404).json({ error: "category not found " });
  results && res.status(200).json({ message: "deleted successfully", results });
};

export {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};

// save() when working with document instances,
// create() for single documents with middleware,
//  insertMany() for bulk operations where performance matters more than middleware.

//  Operational Errors : The application is working correctly, but something in the environment failed
//  Programming Errors : Errors due to mistakes in the code itself

// slugify: Slugify is a JavaScript library that converts strings into URL-friendly slugs.
//  It takes any string and transforms it into a clean, readable format suitable for URLs.

// 100-199 :
// 200-299 :
// 300- 399:
// 400-499:
//500-599:
