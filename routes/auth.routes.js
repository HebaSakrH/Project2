const express = require('express')
const User = require('../models/User.model')
const router = express.Router()
const bcryptjs = require('bcryptjs')
const { isLoggedOut } = require('../middleware/route-guard')
const uploader = require('../middleware/cloudinary.config')

const pwdRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/

//  route to display sign up
router.get('/signup', (req, res, next) => {
  res.render('auth/signup')
})

// route to add user
router.post('/signup', uploader.single('imageUrl'), async (req, res, next) => {
  try {
    const potentialUser = await User.findOne({ username: req.body.username })
    if (!potentialUser) {
      if (pwdRegex.test(req.body.password)) {
        const salt = bcryptjs.genSaltSync(12)
        const passwordHash = bcryptjs.hashSync(req.body.password, salt)

        const newUser = await User.create({
          username: req.body.username,
          passwordHash,
          imageUrl: req.file.path,
        })
        res.redirect('/auth/login')
      } else {
        res.render('auth/signup', {
          errorMessage: 'Password is not Strong enough',
          data: { user: req.body.username },
        })
      }
    } else {
      res.render('auth/signup', {
        errorMessage: 'User name already in use',
        data: { user: req.body.username },
      })
    }
  } catch (error) {
    console.log(error)
  }
})

//  route to display login
router.get('/login', (req, res, next) => {
  res.render('auth/login', {})
})
//    route to login
router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username })
    if (!!user) {
      if (bcryptjs.compareSync(req.body.password, user.passwordHash)) {
        req.session.user = { username: user.username }
        res.redirect('/profile')
      } else {
        res.render('auth/login', { errorMessage: 'Wrong Password' })
      }
    } else {
      res.render('auth/login', { errorMessage: 'User Does not exist' })
    }
  } catch (error) {
    console.log(error)
  }
})

//GET route to update the user informations 
router.get("/edit/:editProfile", async (req, res, next) => {
  try {
    const userToUpdate = await User.findById(req.params.id)
    
    res.render("profile")
  } catch (error) {
    console.log(error);
  }
})


// POST route to update the user informations 
router.post("/edit/:editProfile", async (req, res, next) => {
  try {
    const userToUpdate = await Potion.findByIdAndUpdate(
      
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



router.get('/logout', (req, res, next) => {
  console.log('User logged out')
  req.session.destroy(error => {
    if (error) next(error)
    res.redirect('/')
  })
})

module.exports = router
