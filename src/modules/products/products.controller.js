import slugify from "slugify";
import { productModel } from "../../../models/product.model.js";
import { deleteOne } from "../handlers/factor.js";

const getAllProducts = async (req, res) => {
  let results = await productModel.find({});
  results &&
    res
      .status(200)
      .json({ message: "these are the existing Products:", results });
  !results &&
    res.status(404).json({ message: "there are no Products ", results });
};

const getProductById = async (req, res) => {
  let { id } = req.params;
  let results = await productModel.findById({ id });
  results &&
    res.status(200).json({ message: "this is the demanded Product:", results });
  !results &&
    res.status(404).json({ message: "demanded Product not found", results });
};

const createProduct = async (req, res) => {
  let {
    title,
    price,
    priceAfterDiscount,
    description,
    sold,
    imgCover,
    images,
    category,
    subCategory,
    brand,
    ratingAvg,
    ratingCount,
  } = req.body;
  let results = await productModel.create({
    title,
    slug: slugify(title),
    price,
    priceAfterDiscount,
    description,
    sold,
    imgCover,
    images,
    category,
    subCategory,
    brand,
    ratingAvg,
    ratingCount,
  });
  results && res.status(201).json({ message: "Product added:", results });
};

const updateProduct = async (req, res) => {
  let { id } = req.params;
  let {
    title,
    price,
    priceAfterDiscount,
    description,
    sold,
    imgCover,
    images,
    category,
    subCategory,
    brand,
    ratingAvg,
    ratingCount,
  } = req.body;
  let results = await productModel.findByIdAndUpdate(
    id,
    {
      title,
      slug: slugify(title),
      price,
      priceAfterDiscount,
      description,
      sold,
      imgCover,
      images,
      category,
      subCategory,
      brand,
      ratingAvg,
      ratingCount,
    },
    { new: true }
  );

  !results && res.status(404).json({ error: "Product not found " });
  results && res.status(200).json({ message: "updated successfully", results });
};

const deleteProduct = deleteOne(productModel, "product");

export {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
