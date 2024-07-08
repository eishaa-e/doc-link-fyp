const mongoose = require("mongoose");
const { Schema } = mongoose;

const FoodSchema = new Schema({});

module.exports = mongoose.model("food", FoodSchema);
