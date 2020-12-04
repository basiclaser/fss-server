const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config()
const cors = require("cors");

const connection_URI = process.env.MONGO_URI
    look on line 6, you gotta add your own MONGO_URI ( make a .env file )

// mongoose model
const messageSchema = new mongoose.Schema(
  {
    from: String,
    message: String,
  },
  { timestamps: true }
);
const Message = mongoose.model("message", messageSchema);

// express application
const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// routes
app
  .post("/", async (req, res) => {
    const { from, message } = req.body;
    const result = await Message.insertMany(req.body);
    console.log(`from: ${from}, msg: ${message}`);
    res.json(result[0]);
  })
  .get("/", async (req, res) => {
    const result = await Message.find();
    res.json(result);
  });

// IIFE to start db connection and express listening
(async function () {
  await mongoose.connect(connection_URI);
  app.listen("4000", () => console.log("GO GO GO GO GO http://localhost:4000"));
})();
