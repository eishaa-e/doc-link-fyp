const mongoose = require("mongoose");
const { Schema } = mongoose;

const FoodCategorySchema = new Schema({
  category: { type: String },
});

module.exports = mongoose.model("foodCategory", FoodCategorySchema);
