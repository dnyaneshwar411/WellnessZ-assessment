import mongoose, { Types } from "mongoose";

const bookSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  cover_image: {
    public_id: String,
    url: String,
  },
  added_by: {
    type: Types.ObjectId,
    ref: "User"
  }
}, {
  timestamps: true
})

const Book = mongoose.models.Book || mongoose.model("Book", bookSchema);

export default Book;