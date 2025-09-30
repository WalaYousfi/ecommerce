import { categoryModel } from "../../../models/category.model.js";
import slugify from "slugify";
import { catchError } from "../../../utils/catchError.js";
import { AppError } from "../../../utils/AppError.js";

const getAllCategories = catchError(async (req, res, next) => {
  const category = await categoryModel.find({});
  if (category) return res.status(200).json({ message: "success", category });
  else res.status(404).json({ error: "not found " });
});

const getCategoryById = catchError(async (req, res, next) => {
  let { id } = req.params;
  const category = await categoryModel.findById(id);
  if (category) return res.status(200).json({ message: "success", category });
  else res.status(404).json({ error: "not found " });
});

const addCategory = catchError(async (req, res, next) => {
  req.body.slug = slugify(req.body.name);
  const category = new categoryModel(req.body);
  await category.save();
  res.status(201).json({ message: "category added successfully", category });
});

const updateCategory = catchError(async (req, res, next) => {
  let { id } = req.params;
  let { name } = req.body;
  const category = await categoryModel.findByIdAndUpdate(
    id,
    {
      name,
      slug: slugify(name),
    },
    { new: true }
  );

  //!category && res.status(404).json({ error: "category not found " });
  !category && next(new AppError("category not found ", 404));

  category &&
    res.status(200).json({ message: "updated successfully", category });
});

const deleteCategory = catchError(async (req, res, next) => {
  let { id } = req.params;
  const category = await categoryModel.findByIdAndDelete(id);
  !category && next(new AppError("category not found", 404));
  category &&
    res.status(200).json({ message: "deleted successfully", category });
});

export {
  getAllCategories,
  getCategoryById,
  addCategory,
  updateCategory,
  deleteCategory,
};

// save() when working with document instances,
// add() for single documents with middleware,
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
