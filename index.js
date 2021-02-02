const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const Message = require("./models/message");
const methodOverride = require("method-override");
const ejs = require("ejs");
const ejsMate = require("ejs-mate");
const { runInNewContext } = require("vm");

const app = express();
const port = 3000;

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

mongoose
  .connect("mongodb://mongo:27017/volkhub", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Mongoose connection open!");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.render("messages/home");
});

app.get("/messages", async (req, res) => {
  const messages = await Message.find({});
  res.render("messages/index", { messages });
});

app.get("/messages/new", (req, res) => {
  res.render("messages/new");
});

app.get("/messages/:id/edit", async (req, res) => {
  const message = await Message.findById(req.params.id);
  res.render("messages/edit", { message });
});

app.get("/messages/:id", async (req, res) => {
  const message = await Message.findById(req.params.id);
  res.render("messages/show", { message });
});

app.post("/messages", async (req, res) => {
  const message = new Message(req.body.message);
  await message.save();
  res.redirect(`/messages/${message._id}`);
});

app.listen(port, () => {
  console.log(`Making moves! Listening on http://localhost/${port}`);
});
