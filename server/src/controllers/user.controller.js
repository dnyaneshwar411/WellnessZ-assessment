import { CustomError, handleError } from "../utils/error.js";
import { assignCookie, comparePassword } from "../utils/authentication.js";
import User from './../modals/user.modal.js';

export async function register(req, res) {
  try {
    const { name, username, email, password } = req.body

    // check crdentails format
    if (!name || !email || !username) throw new CustomError("Enter all fields", 400)

    // check if user already exists in the database
    const userExists = await User.findOne({
      $or: [
        { username: username },
        { email: email }
      ]
    });
    if (userExists) throw new CustomError("User already exists with the either the username or email!", 400)

    // create new document
    const user = new User({
      name, email, username, password,
    });
    await user.save();

    // Remove the password field from the user object before sending the response
    const userResponse = user.toObject();
    delete userResponse.password;

    // assign jwt
    if (user) assignCookie(res, user._id)

    // return response
    return res.status(200).json({ success: true, payload: userResponse })
  } catch (error) {
    return handleError(error, res)
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) throw new CustomError("enter all the fields!", 400)

    const user = await User.findOne({
      $or: [
        { username: email },
        { email: email }
      ]
    }).lean().select("+password");

    if (!user) throw new CustomError("No such user exists with give username, email!")

    // check if the password are correct
    const match = await comparePassword(password, user.password);
    if (!match.status) throw new CustomError(match.payload, 400)

    assignCookie(res, user._id);
    delete user.password;

    return res.status(200).json({ success: true, payload: user })
  } catch (error) {
    console.log(error)
    return handleError(error, res)
  }
}

export async function logout(req, res) {
  try {
    res.cookie("Auth-Token", "", { maxAge: 0 });
    return res.status(200).json({ payload: "You have successfully logged out" });
  } catch (error) {
    res.status(500).json({ payload: error.message });
  }
}

export async function profile(req, res) {
  try {
    const user = await User.findOne({ _id: req.user });
    if (!user) throw new CustomError("no such user exists!", 400);
    return res.status(200).json({ payload: user });
  } catch (error) {
    return handleError(error, res)
  }
}