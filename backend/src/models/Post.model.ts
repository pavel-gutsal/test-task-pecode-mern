import mongoose from "mongoose";

const Schema = mongoose.Schema;

const postSchema = new Schema({
  userName: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  userAvatar: {
    type: String,
    required: true
  }
},{ timestamps: true });

export const Post = mongoose.model('Post', postSchema);