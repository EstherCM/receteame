module.exports.getRecipes = (req: any, res: any, next: any) => {
  res.status(200).json({
    success: true,
  });
};

module.exports.getRecipe = (req: any, res: any, next: any) => {
  const { id } = req.params;
  res.status(200).json({
    success: true,
    id, 
  });
};