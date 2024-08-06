import { CustomError, handleError } from "../utils/error.js";
import User from "../modals/user.modal.js";
import Book from './../modals/book.modal.js';

export async function list(req, res) {
  try {
    const books = await Book.find({});

    if (!books) throw new CustomError("books not found, stay tuned for updates!", 400)

    return res.status(200).json({ success: true, payload: books });
  } catch (error) {
    return handleError(error, res)
  }
}

export async function search(req, res) {
  try {

    const { query } = req.query;

    const books = await Book.find({ title: { $regex: query, $options: 'i' } });

    if (!books) throw new CustomError("books not found, stay tuned for updates!", 400)

    return res.status(200).json({ success: true, payload: books });
  } catch (error) {
    return handleError(error, res)
  }
}

export async function addFavourite(req, res) {
  try {
    const { book_id } = req.body;
    const user = await User.findById(req.user);

    if (user.reading_list.includes(book_id)) throw new CustomError("The book is already in the reading list!", 400);

    user.reading_list.push(book_id);

    await user.save();

    if (!user) throw new CustomError("We were unable to add book to favourite.", 400);

    return res.status(200).json({ success: true, payload: user });
  } catch (error) {
    return handleError(error, res)
  }
}

export async function removeFavourite(req, res) {
  try {
    const { book_id } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user,
      { $pull: { reading_list: book_id } },
      { new: true, useFindAndModify: false }
    );

    if (!user) throw new CustomError("Error processing the request, kindly try after sometime", 400);

    return res.status(200).json({ success: true, payload: user });
  } catch (error) {
    console.log(error)
    return handleError(error, res)
  }
}

export async function addBook(req, res) {
  try {
    const { title, description, author, cover_image } = req.body;

    if (!title || !description || !author) throw new CustomError("Enter all the fields!", 400);

    const book = new Book({ title, description, author, cover_image, added_by: req.user });

    await book.save()
    if (!book) throw new CustomError("Error saving the book, kindly tr after sometime!", 400)

    const updatedUser = await User.findByIdAndUpdate(
      req.user,
      { $push: { books_added: book._id } },
      { new: true, useFindAndModify: false }
    );

    return res.status(200).json({ success: true, payload: book })
  } catch (error) {
    return handleError(error, res)
  }
}

export async function removeBook(req, res) {
  try {
    const { book_id } = req.body;

    const book = await Book.findOneAndDelete({
      _id: book_id,
      added_by: req.user
    });

    if (!book) throw new CustomError("No such book found", 400)

    const updatedUser = await User.findByIdAndUpdate(
      req.user,
      { $pull: { books_added: book_id } },
      { new: true, useFindAndModify: false }
    );
    await User.updateMany(
      { reading_list: book_id },
      { $pull: { reading_list: book_id } }
    );
    return res.status(200).json({ success: true, payload: book })
  } catch (error) {
    console.log(error)
    return handleError(error, res)
  }
}