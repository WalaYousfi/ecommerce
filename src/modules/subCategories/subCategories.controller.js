import slugify from "slugify";
import { subCategoryModel } from "../../../models/subCategory.model.js";

const getAllSubCategories = async (req, res) => {
  const results = await subCategoryModel.find();
  results && res.status(200).json({ message: "success", results });
  !results && res.status(404).json({ error: "not found " });
};

const getSubCategoryById = async (req, res) => {
  let { id } = req.params;
  const results = await subCategoryModel.findById(id);
  results && res.status(200).json({ message: "success", results });
  !results && res.status(404).json({ error: "not found " });
};

const addSubCategory = async (req, res) => {
  let { name, category } = req.body;
  await subCategoryModel.insertMany({ name, slug: slugify(name), category });
  return res.status(201).json({ message: "subCategory added successfully" });
};

const updateSubCategory = async (req, res) => {
  let { id } = req.params;
  let { name, category } = req.body;
  const results = await subCategoryModel.findByIdAndUpdate(id, {
    name,
    slug: slugify(name),
    category,
  });
  results && res.status(200).json({ message: "successful update", results });
  !results && res.status(404).json({ error: "not found " });
};

const deleteSubCategory = async (req, res) => {
  let { id } = req.params;
  let results = await subCategoryModel.findByIdAndDelete(id);
  !results && res.status(404).json({ error: "subCategory not found " });
  results &&
    res
      .status(200)
      .json({ message: "subCategory deleted successfully", results });
};

export {
  getAllSubCategories,
  getSubCategoryById,
  addSubCategory,
  updateSubCategory,
  deleteSubCategory,
};
