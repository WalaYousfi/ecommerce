import slugify from "slugify";
import { couponModel } from "../../../models/coupon.model.js";

const getAllCoupons = async (req, res) => {
  let results = await couponModel.find({});
  results &&
    res
      .status(200)
      .json({ message: "these are the existing Coupons:", results });
  !results &&
    res.status(404).json({ message: "there are no Coupons ", results });
};

const getCouponById = async (req, res) => {
  let { id } = req.params;
  let results = await couponModel.findById({ id });
  results &&
    res.status(200).json({ message: "this is the demanded Coupon:", results });
  !results &&
    res.status(404).json({ message: "demanded Coupon not found", results });
};

const createCoupon = async (req, res) => {
  let { code, discount } = req.body;
  let results = await couponModel.create({ code, discount });
  results && res.status(201).json({ message: "Coupon added:", results });
};

const updateCoupon = async (req, res) => {
  let { id } = req.params;
  let { code, expired, discount } = req.body;
  let results = await couponModel.findByIdAndUpdate(
    id,
    {
      code,
      expired,
      discount,
    },
    { new: true }
  );

  !results && res.status(404).json({ error: "Coupon not found " });
  results && res.status(200).json({ message: "updated successfully", results });
};

const deleteCoupon = async (req, res) => {
  let { id } = req.params;
  let results = await couponModel.findByIdAndDelete(id);
  !results && res.status(404).json({ error: "Coupon not found " });
  results &&
    res.status(200).json({ message: "Coupon deleted successfully", results });
};

export {
  getAllCoupons,
  getCouponById,
  createCoupon,
  updateCoupon,
  deleteCoupon,
};
