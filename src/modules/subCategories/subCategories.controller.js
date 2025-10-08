import slugify from "slugify";
import { catchError } from "../../../utils/catchError.js";
import { AppError } from "../../../utils/AppError.js";
import { subCategoryModel } from "../../../models/subCategory.model.js";
import { deleteOne } from "../handlers/factor.js";

const getAllsubCategories = catchError(async (req, res, next) => {
  console.log(req.params);
  let filter = {};
  if (req.params.categoryId) {
    filter = {
      category: req.params.categoryId,
    };
  }
  let subCategory = await subCategoryModel.find(filter);

  res.status(200).json({ message: "success", subCategory });
});

const getsubCategoryById = catchError(async (req, res, next) => {
  let { id } = req.params;
  const subCategory = await subCategoryModel.findById(id);
  res.status(200).json({ message: "success", subCategory });
});

const addsubCategory = catchError(async (req, res, next) => {
  req.body.slug = slugify(req.body.name);
  const subCategory = new subCategoryModel(req.body);
  await subCategory.save();
  res
    .status(201)
    .json({ message: "subCategory added successfully", subCategory });
});

const updatesubCategory = catchError(async (req, res, next) => {
  let { id } = req.params;
  if (req.body.name) req.body.slug = slugify(req.body.name);
  const subCategory = await subCategoryModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  //!subCategory && res.status(404).json({ error: "subCategory not found " });
  !subCategory && next(new AppError("subCategory not found ", 404));

  subCategory &&
    res.status(200).json({ message: "updated successfully", subCategory });
});

const deletesubCategory = deleteOne(subCategoryModel);

export {
  getAllsubCategories,
  getsubCategoryById,
  addsubCategory,
  updatesubCategory,
  deletesubCategory,
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
