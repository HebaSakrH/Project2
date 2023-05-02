const express = require("express");
const { isLoggedIn } = require("../middleware/route-guard");
const router = express.Router();
const User = require('../models/User.model')
const uploader = require('../middleware/cloudinary.config');


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

router.post('/upload-profile-picture', uploader.single("imageUrl"), (req, res, next) => {
  try {
  console.log('file is: ', req.file)
  const image = req.file.path
  const profilePicture = User.findOneAndUpdate({username: req.session.user.username}, image ,{new: true})
  console.log('hello',profilePicture)
  res.redirect('/profile');
  if (!req.file) {
    console.log("there was an error uploading the file")
    next(new Error('No file uploaded!'));
    return;
}
} catch (error) {
  console.log(error)
  }
  // You will get the image url in 'req.file.path'
  // Your code to store your url in your database should be here
})



module.exports = router;
