import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export interface IRecipe {
  name: string;
  image: string;
  ingredients: string[];
  preparation: string[];
  people: number;
  time: number;
  notes: string;
  tags: string[];
  type: string[];
}

const recipeSchema = new Schema(
  {
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
    createdBy: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
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
  }
);

export const Recipe = mongoose.model('recipe', recipeSchema);
