const express = require("express");
const router = express.Router();
const Food = require("../models/Food");
const FoodCategory = require("../models/FoodCategory");

router.get("/allFoods", async (req, res) => {
  let foods = await Food.find({});
  let foodCategory = await FoodCategory.find({});

  res.send([foods, foodCategory]);
});

module.exports = router;
