"use strict";
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
});
