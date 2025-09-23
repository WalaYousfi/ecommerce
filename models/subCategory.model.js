import { model, Schema, SchemaTypes } from "mongoose";

const subCategorySchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
      required: true,
      minLength: [
        1,
        "name must be at least 1 characters long",
      ],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    category: {
      type: Schema.ObjectId,
      required: true,
      ref: 'category'
    },
  },
  {
    timestamps: true,
  }
);



export const subCategoryModel = model("subCategory", subCategorySchema);
