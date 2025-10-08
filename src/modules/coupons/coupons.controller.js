import { couponModel } from "../../../models/coupon.model.js";
import { catchError } from "../../../utils/catchError.js";
import { AppError } from "../../../utils/AppError.js";
import { deleteOne } from "../handlers/factor.js";

const getAllCoupons = catchError(async (req, res, next) => {
  const coupons = await couponModel.find({});
  if (coupons) return res.status(200).json({ message: "success", coupons });
  else res.status(404).json({ error: "not found " });
});

const getCouponById = catchError(async (req, res, next) => {
  let { id } = req.params;
  const coupons = await couponModel.findById(id);
  if (coupons) return res.status(200).json({ message: "success", coupons });
  else res.status(404).json({ error: "not found " });
});

const addCoupon = catchError(async (req, res, next) => {
  const coupons = new couponModel(req.body);
  await coupons.save();
  res.status(201).json({ message: "coupons added successfully", coupons });
});

const updateCoupon = catchError(async (req, res, next) => {
  let { id } = req.params;
  const coupons = await couponModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  //!coupons && res.status(404).json({ error: "coupons not found " });
  !coupons && next(new AppError("coupons not found ", 404));

  coupons &&
    res.status(200).json({ message: "updated successfully", coupons });
});

const deleteCoupon = deleteOne(couponModel);

export {
  getAllCoupons,
  getCouponById,
  addCoupon,
  updateCoupon,
  deleteCoupon,
};

