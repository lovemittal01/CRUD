const express = require("express");
const app = express();
const mongoose = require("mongoose");
const User = require("../models/userModel");

const router = express.Router();

//create
router.post("/", async (req, res) => {
  const { name, email, age } = req.body;

  try {
    const userAdded = await User.create({
      name: name,
      email: email,
      age: age,
    });

    res.status(201).json(userAdded);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

//read
router.get("/", async function (req, res) {
  try {
    const showAll = await User.find();
    res.status(200).send({ showAll });
    // res.send("API running successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
});

//get single user
router.get("/:id", async function (req, res) {
  const { id } = req.params;

  try {
    const singleUser = await User.findById({ _id: id });
    res.status(200).send({ singleUser });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
});

//delete
router.delete("/:id", async function (req, res) {
  const { id } = req.params;

  try {
    const deleteUser = await User.findByIdAndDelete({ _id: id });
    res.status(200).send({ deleteUser });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
});

//update
router.patch("/:id", async function (req, res) {
  const { id } = req.params;
  const { name, email, age } = req.body;
  try {
    const updateUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).send({ updateUser });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
