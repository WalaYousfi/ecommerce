import express from "express";
import * as categoryController from "./categories.controller.js";
import { asyncHandler } from "../../../utils/helpers.js";

const categoryRouter = express.Router();

// categoryRouter.get("/", categoryController.getAllCategories));
// categoryRouter.post("/", categoryController.createCategory));

categoryRouter
  .route("/")
  .get(categoryController.getAllCategories)
  .post(categoryController.createCategory);

categoryRouter
  .route("/:id")
  .get(categoryController.getCategoryById)
  .put(categoryController.updateCategory)
  .delete(categoryController.deleteCategory);

// categoryRouter.put("/:id", categoryController.updateCategory));
// categoryRouter.delete("/:id", categoryController.deleteCategory));

export default categoryRouter;
