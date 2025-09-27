import express from "express";
import { signIn, signUp } from "./user.controller.js";
import { asyncHandler } from "../../../utils/helpers.js";

const router = express.Router();

router.post("/signUp", asyncHandler(signUp));

router.post("/signIn", asyncHandler(signIn));

export default router;
