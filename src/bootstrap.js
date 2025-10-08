import { AppError } from "../utils/AppError.js";
import { globalError } from "./middlewares/globalErrorMiddleware.js";
import categoryRouter from "./modules/categories/categories.routes.js";
import subCategoryRouter from "./modules/subCategories/subCategories.routes.js";
import brandRouter from "./modules/brands/brands.routes.js";
import productRouter from "./modules/products/products.routes.js";
//error handling middleware

export function bootstrap(app) {
  app.use("/api/v1/categories", categoryRouter);
  app.use("/api/v1/subcategories", subCategoryRouter);
  app.use("/api/v1/brands", brandRouter);
  app.use("/api/v1/products", productRouter);

  app.get("/", (req, res) => {
    res.send("hello world");
  });

  app.use((req, res, next) => {
    // catches any unknown URLs and throws a "not found" error
    //res.status(404).json({ message: "not found endpoint" });
    next(new AppError("not found endpoint", 404));
  });

  // global error handler middleware
  app.use(globalError);
}
