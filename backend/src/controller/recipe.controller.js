"use strict";
module.exports.getRecipes = (req, res, next) => {
    res.status(200).json({
        success: true,
    });
};
module.exports.getRecipe = (req, res, next) => {
    const { id } = req.params;
    res.status(200).json({
        success: true,
        id,
    });
};
