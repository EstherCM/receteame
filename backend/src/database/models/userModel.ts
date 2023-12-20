const mongoose = require('mongoose');
const Schema = mongoose.Schema;

export interface IUser {
  name: string;
  email: string;
  password: string;
}

const userSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  {
    timestamp: true,
    toJSON: {
      virtuals: true,
      transform: (doc: Document, ret: any) => {
        delete ret.__v;
        ret.id = ret._id;
        delete ret._id;
        return ret;
      },
    },
  },
);

export const User = mongoose.model('user', userSchema);
