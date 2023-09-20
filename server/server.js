const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/userModel");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");

app.use(cors());

app.use(express.json());

dotenv.config();

mongoose
  .connect(process.env.URI)
  .then(() => {
    console.log("connected successfully");
    app.listen(process.env.PORT || 8000, (err) => {
      if (err) console.log("error", err);

      console.log("running successfully at", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log("error", error);
  });

app.use(userRoutes);
