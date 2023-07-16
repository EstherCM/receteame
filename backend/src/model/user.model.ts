const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
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
    require: true
  }
}, {
  timestamp: true,
  toJSON: {
    virtuals: true,
    transform: (doc: any, ret: any) => {
      delete ret.__v;
      ret.id = ret._id;
      delete ret._id;
      return ret;
    },
  }
});

const User = mongoose.model('user', userSchema);
module.exports = User;

export {};
