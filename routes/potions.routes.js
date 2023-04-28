const express = require("express");
const User = require("../models/Potion.model");
const Potion = require("../models/Potion.model");
const router = express.Router();

// route to display create potion form
router.get("/", (req, res, next) => {
  res.render("potions/create");
});

// route to create potion - CRUD
router.post("/create", async (req, res, next) => {
  try {
    const newPotion = await Potion.create({
      ...req.body,
      ingredients: req.body.ingredients.split(" "),
    });
    console.log(newPotion);
    res.redirect(`/potions/${newPotion._id}`);
  } catch (error) {
    console.log(error);
  }
});

// route to read potion - CRUD

// route to update potion - CRUD

// route to delete potion - CRUD

module.exports = router;
