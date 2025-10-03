import express from "express";
import * as couponController from "./coupons.controller.js";

const couponRouter = express.Router();

couponRouter
  .route("/")
  .get(couponController.getAllCoupons)
  .post(couponController.createCoupon);

couponRouter
  .route("/:id")
  .get(couponController.getCouponById)
  .put(couponController.updateCoupon)
  .delete(couponController.deleteCoupon);

export default couponRouter;
