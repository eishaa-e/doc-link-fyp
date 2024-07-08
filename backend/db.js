const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017/doc-link";

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
