import { model, Schema, SchemaTypes } from "mongoose";

const reviewSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "product",
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    rate: {
      type: Number,
      enum: { values: [1, 2, 3, 4, 5] },
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const reviewModel = model("review", reviewSchema);
