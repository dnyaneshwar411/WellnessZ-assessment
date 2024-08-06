import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';

export function assignCookie(res, _id) {
  const token = jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: 86400000 });

  res.cookie("Auth-Token", token, {
    maxAge: 86400000,
    httpOnly: false
  });
}

export async function comparePassword(password, hashedPassword) {
  try {
    const match = await bcrypt.compare(password, hashedPassword)
    if (!match) return { status: false, payload: "Enter correct password" };
    return { status: true };
  } catch (error) {
    return { status: false, payload: error.message };
  }
}