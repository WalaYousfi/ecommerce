import { AppError } from "../../../utils/AppError.js";
import { catchError } from "../../../utils/catchError.js";

export const deleteOne = (model, name) => {
  return catchError(async (req, res, next) => {
    let { id } = req.params;
    const document = await model.findByIdAndDelete(id);
    !document && next(new AppError(`${name} not found`, 404));
    let response = {};
    response[name] = document;
    document &&
      res.status(200).json({ message: "deleted successfully", ...response });  // dynamic response
  });
  // ...response : spread operator
};

// this is a method called refactoring for clean code

