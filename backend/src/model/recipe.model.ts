const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    trim: true,
  },
  ingredients: {
    type: [String],
    required: true,
  },
  preparation: {
    type: [String],
    required: true,
  },
  people: Number,
  time: Number,
  notes: {
    type: String,
    trim: true,
  },
  tags: [String],
  type: [String],
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

const Recipe = mongoose.model('recipe', recipeSchema);
module.exports = Recipe;

export {};