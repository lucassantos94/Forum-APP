import { Schema } from 'mongoose';
export interface ICommentModel {
  text: string;
  userId: string;
  date: Date;
}

export const commentSchema = new Schema({
  text: {
    type: String,
    maxlength: 500,
    min: 1,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
});
