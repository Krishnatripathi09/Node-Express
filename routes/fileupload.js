const multer = require("multer");
const express = require("express");
const User = require("../model/userSchema");
const path = require("path")
const fileRouter = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

fileRouter.post("/uploads", upload.single("file"), async (req, res) => {
  try {
    const data = await User({
      name: req.body.name,
      file: req.file.path,
    });

    await data.save();

    res.status(200).send("File Saved SuccessFully");
  } catch (err) {
    res.status(400).send("Error Occured ==> " + err);
  }
});

module.exports = {
  fileRouter,
};
