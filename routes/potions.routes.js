const express = require("express");
const User = require("../models/User.model");
const Potion = require("../models/Potion.model");
const { isLoggedIn } = require("../middleware/route-guard");
const router = express.Router();

// route to get all the potions
router.get("/", async (req, res, next) => {
  try {
    const allPotions = await Potion.find();
    res.render("potions/all", { allPotions });
  } catch (error) {
    console.log(error);
  }
});

router.get("/create", (req, res, next) => {
  res.render("potions/create");
});

// route to create potion
router.post("/create", async (req, res, next) => {
  try {
    let currentUser = await User.findOne({
      username: req.session.user.username,
    });
    console.log("here: " + currentUser);
    const newPotion = await Potion.create({
      ...req.body,
      ingredients: req.body.ingredients.split(" "),
      createdBy: currentUser,
    });
    console.log(req.session._id);
    res.redirect(`/potions/${newPotion._id}`);
  } catch (error) {
    console.log(error);
  }
});

// route to all user's potion
router.get("/my-potions", async (req, res, next) => {
  try {
    let currentUser = await User.findOne({
      username: req.session.user.username,
    });
    const myPotions = await Potion.find({ createdBy: currentUser });
    console.log("Your potions are here ", myPotions);
    res.render("potions/my-potions", {myPotions});
  } catch (error) {
    console.log(error);
  }
});

// route to show user potions from my-potions
router.get("/my-potions/:potionId" , async (req, res, next) => {
try {
  const potion = await Potion.findById(req.params.potionId);
  console.log("potions details here", potion)
  res.redirect(`/potions/${potion._id}`);
} catch(error) {
  console.log(error);
}
})

//  route to search potion
router.get("/search", async (req, res, next) => {
  try {
    console.log("Hello guysss", req.query);
    const findPotion = await Potion.find({ title: req.query.title });
    console.log("Where are you", findPotion);
    res.render("potions/search", {findPotion} );
  } catch (error) {
    console.log(error);
  }
});

// route to get one potion
router.get("/:potionId", async (req, res, next) => {
  try {
    console.log(req.query);
    const potion = await Potion.findById(req.params.potionId);
    res.render("potions/one", { potion: potion, query: req.query });
    // conditional in case potions is not found in the DB
  } catch (error) {
    console.log(error);
  }
});

// route to POST update potion
router.post("/:potionId", async (req, res, next) => {
  try {
    const editPotion = await Potion.findByIdAndUpdate(
      req.params.potionId,
      {
        ...req.body,
        ingredients: req.body.ingredients.split(" "),
      },
      { new: true }
    );
    res.redirect(`/potions/${editPotion._id}`);
  } catch (error) {
    console.log(error);
  }
});

// route to delete potion
router.get("/:potionId/delete", async (req, res, next) => {
  try {
    await Potion.findByIdAndDelete(req.params.potionId);
    res.redirect("/potions");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
