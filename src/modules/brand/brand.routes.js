import express from "express";
import * as brandController from "./brand.controller.js";

const brandRouter = express.Router();

brandRouter
  .route("/")
  .get(brandController.getAllBrands)
  .post(brandController.createBrand);

brandRouter
  .route("/:id")
  .get(brandController.getBrandById)
  .put(brandController.updateBrand)
  .delete(brandController.deleteBrand);

export default brandRouter;
