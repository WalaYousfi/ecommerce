import { model, Schema } from "mongoose";

const couponSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
    },

    expired: {
      type: Boolean,
      default: false,
    },

    discount: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const couponModel = model("coupon", couponSchema);
