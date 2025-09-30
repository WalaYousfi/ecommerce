import { AppError } from "../utils/AppError.js";
import categoryRouter from "./modules/categories/categories.routes.js";

//error handling middleware

export function bootstrap(app) {
  app.use("/api/v1/categories", categoryRouter);
  app.get("/", (req, res) => {
    res.send("hello world");
  });
  app.all("*", (req, res, next) => {
    //res.status(404).json({ message: "not found endpoint" });
    //next(new Error("not found endpoint"));
    next(new AppError("not found endpoint", 404));
  });
  app.use((err, req, res, next) => {
    let error = err.message;
    let code = err.statusCode || 500;
    res.status(code).json({ error, stack: err.stack });  //let u know the trace of error// line number + file
  });
}
