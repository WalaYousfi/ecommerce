import { model, Schema, SchemaTypes } from "mongoose";

const reviewSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    productId: {
      type: SchemaTypes.ObjectId,
      required: true,
    },
    userId: {
      type: SchemaTypes.ObjectId,
      required: true,
    },
    rate: {
      type: Number,
      enum: { values: [1, 2, 3, 4, 5], message: "{VALUE} is not supported" },
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const reviewModel = model("review", reviewSchema);
