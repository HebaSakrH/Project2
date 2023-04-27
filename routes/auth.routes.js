const express = require('express')
const User = require('../models/User.model')
const router = express.Router()

// bcryptpk 
// const pwdRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/

//  route to display sign up 
router.get('/signup', (req ,res, next ) => {
 res.render('auth/signup')
})

//  route to display login
router.get('/login', (req ,res, next ) => {
    res.render('auth/login')
   })






   module.exports = router;