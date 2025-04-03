import mongoose, { Types } from 'mongoose';
import { IRecipe } from 'recipe-models';

const Schema = mongoose.Schema;

interface IRecipeModel extends IRecipe {
  createdBy: Types.ObjectId;
}

const recipeSchema = new Schema<IRecipeModel>(
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
      required: false,
      ref: 'User',
    },
  },
  {
    timestamps: true,
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

export const Recipe = mongoose.model('recipe', recipeSchema);
