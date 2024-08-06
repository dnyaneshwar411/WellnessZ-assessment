import express from "express";

import { list, search, addFavourite, removeFavourite, addBook, removeBook } from "../controllers/catalogue.controller.js";
import { isAuthorizedUser } from "../middlewares/user.middleware.js";

const router = express.Router();

// get request to get list of books and searching through the books
router.get("/list", list);
router.get("/search", search);

// api endpoints for adding and removing favourites
router.post("/add-favourite", isAuthorizedUser, addFavourite);
router.post("/remove-favourite", isAuthorizedUser, removeFavourite);

// api endpoint for adding and removing a book from the catalogue
router.post("/add-book", isAuthorizedUser, addBook);
router.post("/remove-book", isAuthorizedUser, removeBook);

export default router;