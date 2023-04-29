const express = require("express");
const User = require("../models/Potion.model");
const Potion = require("../models/Potion.model");
const router = express.Router();

// route to get all the potions
router.get("/all", async (req, res, next) => {
  try {
    const allPotions = await Potion.find();
    res.render("potions/all", { allPotions });
    console.log(allPotions);
  } catch (error) {
    console.log(error);
  }
});

// route to display create potion form
router.get("/create", (req, res, next) => {
  res.render("potions/create");
});

// route to create potion
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

// route to get one potion
router.get("/:potionId", async (req, res, next) => {
  try {
    const potion = await Potion.findById(req.params.potionId);
    res.render("potions/one", potion);
    console.log(potion);
    // conditional in case potions is not found in the DB
  } catch (error) {
    console.log(error);
  }
});

// route to get one potion to update
router.get("/:potionId/update", async (req, res, next) => {
  try {
    const potion = await Potion.findById(req.params.potionId);
    res.render("potions/create", { potion, isUpdating: true });
    console.log("check here: ", isUpdating);
  } catch (error) {
    console.log(error);
  }
});

// route to POST update potion
router.post("/:potionId/update", async (req, res, next) => {
  try {
    const updatePotion = await Potion.findByIdAndUpdate(req.params.potionId, {
      ...req.body,
      ingredients: req.body.ingredients.split(" "),
    });
    res.redirect(`/potions/${updatePotion}`);
  } catch (error) {
    console.log(error);
  }
});

// route to delete potion - CRUD

module.exports = router;
