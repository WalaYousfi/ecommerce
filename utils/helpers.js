import jwt from "jsonwebtoken";
import slugify from "slugify";

export function generateToken(id, name) {
  return jwt.sign({ id, name }, process.env.SECRET_KEY);
}

export function asyncHandler(fn) {
  //Takes an async function fn
  return (req, res, next) => {
    //  returns A new function that has the same signature (req, res, next)
    return Promise.resolve(fn(req, res, next).catch(next)); 
    // checks out for errors either catches error and throw it to the next middleware or u get a normal response
  };
}

// search multer : file upload
// cloudinary
// pagination
// template engine ejs
// insert excel data to mongoDB
// create pdf
// send attachement
