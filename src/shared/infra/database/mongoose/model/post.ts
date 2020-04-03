import { Schema, model, Document } from 'mongoose';
import { commentSchema, ICommentModel } from './comment';
import { v4 as uuid } from 'uuid';
export interface IPostModel extends Document {
  _id: string;
  text: string;
  userId: string;
  date: Date;
  comments: ICommentModel[];
}

const postSchema = new Schema({
  _id: {
    type: String,
    default: uuid,
  },
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
  comments: [commentSchema],
});

export default model<IPostModel>('post', postSchema);
