const express = require("express");
const { isLoggedIn } = require("../middleware/route-guard");
const router = express.Router();
const User = require('../models/User.model')

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/profile", isLoggedIn, async (req, res, next) => {
  let currentUser = await User.findOne({username: req.session.user.username})
  res.render("profile", { user: req.session.user ,  randomHouse: currentUser.house });
  
});

router.post('/sort-house', async (req, res, next) => {
  const houses = ["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"];
  const randomHouse = houses[Math.floor(Math.random() * houses.length)];
  console.log(req.session)
  const updatedHouse = await User.findOneAndUpdate({username: req.session.user.username}, {house: randomHouse}, {new: true})
  console.log(updatedHouse)
  res.redirect('/profile');
});

module.exports = router;
