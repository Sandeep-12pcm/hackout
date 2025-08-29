import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  Password: {
    type: String,
    required: true,
    minlength: 6
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

const userDetails=mongoose.model("user",userSchema);

export default userDetails;