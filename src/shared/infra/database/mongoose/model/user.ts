import { Schema, model, Document } from 'mongoose';
import { v4 as uuid } from 'uuid';
export interface IUserModel extends Document {
  _id: string;
  email: string;
  alias: string;
  user: string;
  pass: string;
}

const UserSchema = new Schema({
  _id: {
    type: String,
    default: uuid,
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
    match: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  },
  alias: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 40,
  },
  user: {
    type: String,
    lowercase: true,
    required: true,
    minlength: 5,
    maxlength: 40,
  },
  pass: {
    type: String,
    required: true,
  },
});

export default model<IUserModel>('user', UserSchema);
