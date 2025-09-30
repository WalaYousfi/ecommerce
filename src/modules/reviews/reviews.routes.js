import express from "express";
import * as reviewsController from "./reviews.controller.js";

const reviewsRouter = express.Router();

reviewsRouter
  .route("/")
  .get(reviewsController.getAllReviews)
  .post(reviewsController.createReview);

reviewsRouter
  .route("/:id")
  .get(reviewsController.getReviewById)
  .put(reviewsController.updateReview)
  .delete(reviewsController.deleteReview);

export default reviewsRouter;
