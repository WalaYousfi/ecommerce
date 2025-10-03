import slugify from "slugify";
import { brandModel } from "../../../models/brand.model.js";

const getAllBrands = async (req, res) => {
  let results = await brandModel.find({});
  results &&
    res
      .status(200)
      .json({ message: "these are the existing brands:", results });
  !results &&
    res.status(404).json({ message: "there are no brands ", results });
};

const getBrandById = async (req, res) => {
  let { id } = req.params;
  let results = await brandModel.findById({ id });
  results &&
    res.status(200).json({ message: "this is the demanded Brand:", results });
  !results &&
    res.status(404).json({ message: "demanded Brand not found", results });
};

const createBrand = async (req, res) => {
  let { name } = req.body;
  let results = await brandModel.create({ name, slug: slugify(name) });
  results && res.status(201).json({ message: "Brand added:", results });
};

const updateBrand = async (req, res) => {
  let { id } = req.params;
  let { name } = req.body;
  let results = await brandModel.findByIdAndUpdate(
    id,
    {
      name,
      slug: slugify(name),
    },
    { new: true }
  );

  !results && res.status(404).json({ error: "Brand not found " });
  results && res.status(200).json({ message: "updated successfully", results });
};

const deleteBrand = async (req, res) => {
  let { id } = req.params;
  let results = await brandModel.findByIdAndDelete(id);
  !results && res.status(404).json({ error: "Brand not found " });
  results &&
    res.status(200).json({ message: "Brand deleted successfully", results });
};

export { getAllBrands, getBrandById, createBrand, updateBrand, deleteBrand };
