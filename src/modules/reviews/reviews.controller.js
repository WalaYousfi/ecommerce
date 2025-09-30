import slugify from "slugify";
import { reviewModel } from "../../../models/review.model.js";

const getAllReviews = async (req, res) => {
  let results = await reviewModel.find({});
  results &&
    res
      .status(200)
      .json({ message: "these are the existing Reviews:", results });
  !results &&
    res.status(404).json({ message: "there are no Reviews ", results });
};

const getReviewById = async (req, res) => {
  let { id } = req.params;
  let results = await reviewModel.findById({ id });
  results &&
    res.status(200).json({ message: "this is the demanded Review:", results });
  !results &&
    res.status(404).json({ message: "demanded Review not found", results });
};

const createReview = async (req, res) => {
  let { text, product, user, rate } = req.body;
  let results = await reviewModel.create({ text, product, user, rate });
  results && res.status(201).json({ message: "Review added:", results });
};

const updateReview = async (req, res) => {
  let { id } = req.params;
  let { text, rate } = req.body;
  let results = await reviewModel.findByIdAndUpdate(
    id,
    {
      text,
      rate,
    },
    { new: true }
  );

  !results && res.status(404).json({ error: "Review not found " });
  results && res.status(200).json({ message: "updated successfully", results });
};

const deleteReview = async (req, res) => {
  let { id } = req.params;
  let results = await reviewModel.findByIdAndDelete(id);
  !results && res.status(404).json({ error: "Review not found " });
  results &&
    res.status(200).json({ message: "Review deleted successfully", results });
};

export {
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
};
