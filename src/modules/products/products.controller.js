import { productModel } from "../../../models/product.model.js";
import slugify from "slugify";
import { catchError } from "../../../utils/catchError.js";
import { AppError } from "../../../utils/AppError.js";
import { deleteOne } from "../handlers/factor.js";

// 1: pagination
// 2: filter
// 3: sort
// 4: search
// 5: selected fields

const getAllProducts = catchError(async (req, res, next) => {
  const PAGE_LIMIT = 2;
  let PAGE_NUMBER = req.query.page * 1 || 1;
  if (PAGE_NUMBER <= 0) PAGE_NUMBER = 1;
  const SKIP = (PAGE_NUMBER - 1) * PAGE_LIMIT;
  console.log(req.query);
  const Products = await productModel.find().skip(SKIP).limit(PAGE_LIMIT);
  if (Products)
    return res
      .status(200)
      .json({ page: PAGE_NUMBER, message: "success", Products });
  else res.status(404).json({ error: "not found " });
});

const getProductById = catchError(async (req, res, next) => {
  let { id } = req.params;
  const Products = await productModel.findById(id);
  if (Products) return res.status(200).json({ message: "success", Products });
  else res.status(404).json({ error: "not found " });
});

const addProduct = catchError(async (req, res, next) => {
  req.body.slug = slugify(req.body.title);
  const Products = new productModel(req.body);
  await Products.save();
  res.status(201).json({ message: "Products added successfully", Products });
});

const updateProduct = catchError(async (req, res, next) => {
  let { id } = req.params;
  if (req.body.title) req.body.slug = slugify(req.body.title);
  const Products = await productModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  //!Products && res.status(404).json({ error: "Products not found " });
  !Products && next(new AppError("Products not found ", 404));

  Products &&
    res.status(200).json({ message: "updated successfully", Products });
});

const deleteProduct = deleteOne(productModel);

export {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
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
