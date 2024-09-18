const mongoose = require("mongoose");
const mongoURI = "mongodb+srv://nisha:nisha@cluster0.yvh2u.mongodb.net/docLink";

const connectToMongo = () => {
  mongoose
    .connect(mongoURI)
    .then(() => {
      console.log("Connected to MongoDB Successfully");
    })
    .catch((err) => {
      console.error(err);
    });
};

module.exports = connectToMongo;
