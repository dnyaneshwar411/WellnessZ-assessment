import mongoose, { Types } from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  avatar: {
    public_id: String,
    url: String,
  },
  books_added: [
    {
      type: Types.ObjectId,
      ref: "Book",
      unique: true,
    }
  ],
  reading_list: [
    {
      type: Types.ObjectId,
      ref: "Book",
      unique: true,
    }
  ],
  password: {
    type: String,
    required: true,
    select: false
  }
}, {
  timestamps: true
})

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
})

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;