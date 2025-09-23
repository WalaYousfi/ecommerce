import { model, Schema } from "mongoose";

const categorySchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      minLength: [
        2,
        "name must be at least 2 characters long",
      ],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const categoryModel = model("category", categorySchema);
