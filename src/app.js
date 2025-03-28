const express = require("express");
const app = express();
const { connectDB } = require("../config/database");
const { fileRouter } = require("../routes/fileupload");
const PORT = 7000;

connectDB().then(() => {
  console.log("connection to DataBase SuccessFull");

  app.listen(PORT, () => {
    console.log(`Server is Listening on ${PORT}`);
  });
});

app.use("/", fileRouter);
