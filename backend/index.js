const express = require("express");
const app = express();
const port = 5000;
const connectToMongo = require("./db");
var cors = require("cors");

connectToMongo();

app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/auth", require("./routes/auth"));
//app.use("/api/food", require("./routes/food"));

app.get("/", (req, res) => {
  res.send("Hello Peter!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
