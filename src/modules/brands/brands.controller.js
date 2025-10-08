import { brandModel } from "../../../models/brand.model.js";
import slugify from "slugify";
import { catchError } from "../../../utils/catchError.js";
import { AppError } from "../../../utils/AppError.js";
import { deleteOne } from "../handlers/factor.js";

const getAllBrands = catchError(async (req, res, next) => {
  const brand = await brandModel.find({});
  if (brand) return res.status(200).json({ message: "success", brand });
  else res.status(404).json({ error: "not found " });
});

const getBrandById = catchError(async (req, res, next) => {
  let { id } = req.params;
  const brand = await brandModel.findById(id);
  if (brand) return res.status(200).json({ message: "success", brand });
  else res.status(404).json({ error: "not found " });
});

const addBrand = catchError(async (req, res, next) => {
  req.body.slug = slugify(req.body.name);
  const brand = new brandModel(req.body);
  await brand.save();
  res.status(201).json({ message: "brand added successfully", brand });
});

const updateBrand = catchError(async (req, res, next) => {
  let { id } = req.params;
  req.body.slug = slugify(req.body.name);
  let brand = await brandModel.findByIdAndUpdate(id, req.body, { new: true });

  //!brand && res.status(404).json({ error: "brand not found " });
  !brand && next(new AppError("brand not found ", 404));

  brand && res.status(200).json({ message: "updated successfully", brand });
});

const deleteBrand = deleteOne(brandModel);

export { getAllBrands, getBrandById, addBrand, updateBrand, deleteBrand };

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
