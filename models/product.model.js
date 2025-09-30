import { model, Schema } from "mongoose";

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: [1, "title must be at least 1 characters long"],
      trim: true,
      unique: true,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    price: {
      type: Number,
      default: 0,
      min: 0,
    },
    priceAfterDiscount: {
      type: Number,
      default: 0,
      min: 0,
    },
    description: {
      type: String,
      required: true,
      maxLength: [
        100,
        "description must be less than or equal to 100 caracters",
      ],
      min: [10, "too short product description"],
    },
    sold: {
      type: Number,
      default: 0,
    },
    imgCover: {
      type: String,
    },
    images: {
      type: [String],
    },
    category: {
      type: Schema.ObjectId,
      required: true,
      ref: "category",
    },
    subCategory: {
      type: Schema.ObjectId,
      required: true,
      ref: "subCategory",
    },
    brand: {
      type: Schema.ObjectId,
      required: true,
      ref: "brand",
    },
    ratingAvg: {
      type: Number,
      min: 1,
      max: 5,
    },
    ratingCount: {
      type: Number,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const productModel = model("product", productSchema);
