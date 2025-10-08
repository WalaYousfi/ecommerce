import express from "express";
import * as categoryController from "./categories.controller.js";
import subCategoryRouter from "../subCategories/subCategories.routes.js";

const categoryRouter = express.Router();

categoryRouter.use("/:categoryId/subcategories", subCategoryRouter);

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
