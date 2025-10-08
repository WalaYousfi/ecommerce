import express from "express";
import * as subCategoryController from "./subCategories.controller.js";

const subCategoryRouter = express.Router();

subCategoryRouter
  .route("/")
  .get(subCategoryController.getAllsubCategories)
  .post(subCategoryController.addsubCategory);

subCategoryRouter
  .route("/:id")
  .get(subCategoryController.getsubCategoryById)
  .put(subCategoryController.updatesubCategory)
  .delete(subCategoryController.deletesubCategory);

export default subCategoryRouter;
