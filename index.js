const express = require("express");
const bodyParser = require("body-parser");
const route = require("./src/routes/route");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

mongoose
  .connect(
    "mongodb+srv://vaibhav:F63ZxVziQLD6fMCf@cluster0.crdo5gu.mongodb.net/Project-ranktopic-DB?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
    }
  )
  .then((result) => console.log("MongoDb is connected"))
  .catch((err) => console.log(err));

app.use("/", route);

app.listen(process.env.PORT || 3000, function () {
  console.log("Express app running on port " + (process.env.PORT || 3000));
});
