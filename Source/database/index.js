const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_DB)
  .then(() => console.log("MongoDB is connect"))
  .catch((err) => {
    console.log(err);
  });