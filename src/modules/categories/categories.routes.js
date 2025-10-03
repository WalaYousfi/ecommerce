import express from "express";
import * as categoryController from "./categories.controller.js";

const categoryRouter = express.Router();

categoryRouter
  .route("/")
  .get(categoryController.getAllCategories)
  .post(categoryController.addCategory);

categoryRouter
  .route("/:id")
  .get(categoryController.getCategoryById)
  .put(categoryController.updateCategory)
  .delete(categoryController.deleteCategory);

export default categoryRouter;
