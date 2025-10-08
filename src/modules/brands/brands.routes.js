import express from "express";
import * as brands from "./brands.controller.js";

const brandRouter = express.Router();

brandRouter
  .route("/")
  .get(brands.getAllBrands)
  .post(brands.addBrand);

brandRouter
  .route("/:id")
  .get(brands.getBrandById)
  .put(brands.updateBrand)
  .delete(brands.deleteBrand);

export default brandRouter;
