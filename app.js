const express = require("express");
const app = express();
const port = process.env.PORT || 2000;
const userModel = require("./model/userSchema");
const mongoose = require("mongoose");
require("./model/db");
const jwt = require("jsonwebtoken");
const auth = require("./auth");
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.post("/createuser", async (req, res) => {
  try {
    const data = new userModel(req.body);
    await data.save();
    res.status(201).send("Successfull");
  } catch (err) {
    res.status(400).send(err);
  }
});
app.post("/loginuser", async (req, res) => {
  try {
    const user = await userModel.findByCredentials(
      req.body.username,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
  //res.send('Hi');
  //console.log('hello');
});
app.get("/validateuser", auth, async (req, res) => {
  try {
    res.send({ message: "true" });
  } catch (err) {
    res.status(400).send(err);
  }
});

app.listen(port, () => {
  console.log("server is running on port 2000");
});
