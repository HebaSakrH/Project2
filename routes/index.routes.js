const express = require('express')
const { isLoggedIn } = require('../middleware/route-guard')
const router = express.Router()
const User = require('../models/User.model')
const uploader = require('../middleware/cloudinary.config')

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index')
})

router.get('/profile', isLoggedIn, async (req, res, next) => {
  let currentUser = await User.findOne({ username: req.session.user.username })
  console.log('CURRENT USER', currentUser)
  res.render('profile', {
    user: req.session.user,
    randomHouse: currentUser.house,
    profilePicture: currentUser.imageUrl,
    query: req.query,
    
  })
})

// POST route to update the user informations
router.post('/profile', uploader.single('imageUrl'), async (req, res, next) => {
  try {
    //const user = req.params.id
    let currentUser = await User.findOne({ username: req.session.user.username })
    console.log('CURRENT USER', currentUser)
    const fileAdded = req.hasOwnProperty('file')
    const newUserName = req.body.username
    req.session.user.username = newUserName
    const userToUpdate = await User.findByIdAndUpdate(
      currentUser,
      {
        username: newUserName,
        randomHouse: currentUser.house,
        ...(fileAdded && { imageUrl: req.file.path }),
      },
      { new: true }
    )
    res.redirect('/profile')
  } catch (error) {
    console.log(error)
  }
})

router.post('/sort-house', async (req, res, next) => {
  const houses = ['Gryffindor', 'Hufflepuff', 'Ravenclaw', 'Slytherin']
  const randomHouse = houses[Math.floor(Math.random() * houses.length)]
  console.log(req.session)
  const updatedHouse = await User.findOneAndUpdate(
    { username: req.session.user.username },
    { house: randomHouse },
    { new: true }
  )
  console.log(updatedHouse)
  res.redirect('/profile')
})

module.exports = router
