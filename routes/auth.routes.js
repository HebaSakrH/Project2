const express = require('express')
const User = require('../models/User.model')
const router = express.Router()
const bcryptjs = require('bcryptjs')

const pwdRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/

//  route to display sign up 
router.get('/signup', (req ,res, next ) => {
    res.render('auth/signup')
})

// route to add user 
router.post('/signup', async(req, res, next) =>{
    try {
     const potentialUser = await User.findOne({ username: req.body.username})
     if (!potentialUser) {

       if (pwdRegex.test(req.body.password)) {
           const salt = bcryptjs.genSaltSync(12)
           const passwordHash = bcryptjs.hashSync(req.body.password, salt)
           const newUser = await User.create({ username: req.body.username, passwordHash }) 
           res.redirect('/auth/login')
       } else {
        res.render('auth/signup', {errorMessage: 'Password is not Strong enough', data:{user:req.body.username }})
       } 
     } else {
        res.render('auth/signup', {errorMessage: 'User name already in use', data: {user:req.body.username }})
     }
   } catch (error) {
    console.log(error)    
   }
   })


//  route to display login
router.get('/login', (req ,res, next ) => {
    res.render('auth/login')
   })
//    route to login 
router.post('/login', async (req, res, next ) => {
    try {
      const user = await User.findOne({username: req.body.username }) 
      console.log(user)
      if (!!user) {
       if (bcryptjs.compareSync(req.body.password, user.passwordHash)) {
        req.session.user = { username: user.username }
        res.redirect('/profile')
       } else {
        res.render('auth/login', {errorMessage: 'Wrong Password'})
       }
      } else {
       res.render('auth/login', {errorMessage: 'User Does not exist'})
      }

    } catch (error) {
    console.log(error) 
    }
}) 




   module.exports = router;