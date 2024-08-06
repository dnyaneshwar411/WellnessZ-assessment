import jwt from "jsonwebtoken";
import { CustomError, handleError } from "../utils/error.js";

export async function isAuthorizedUser(req, res, next) {
  try {
    const authToken = req.cookies["Auth-Token"]

    if (!authToken) throw new CustomError("Not authorized to access the content, kindly Login!", 400)

    const verify = jwt.verify(authToken, process.env.JWT_SECRET)

    if (!verify) throw new CustomError("Invalid cookie", 400);

    req.user = verify._id

    next();
  } catch (error) {
    return handleError(error, res)
  }
}