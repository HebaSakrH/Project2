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
    res.redirect("/potions");
  } catch (error) {
    console.log(error);
  }
});

// route to see/read potion - CRUD
// router.get("/:potionId", async (req, res, next) => {
//   try {
//     const potion = await Potion.findById(req.params.potionId);
//     console.log(potion);
//   } catch (error) {
//     console.log(error);
//   }
// });

// route
// finAll()

// route to update potion - CRUD

// route to delete potion - CRUD

module.exports = router;
