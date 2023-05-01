const express = require('express')
const User = require('../models/Potion.model')
const Potion = require('../models/Potion.model')
const router = express.Router()

// route to get all the potions
router.get('/', async (req, res, next) => {
  try {
    const allPotions = await Potion.find()
    res.render('potions/all', { allPotions })
  } catch (error) {
    console.log(error)
  }
})

// route to display create potion form
router.get('/create', (req, res, next) => {
  res.render('potions/create')
})

// route to create potion
router.post('/create', async (req, res, next) => {
  try {
    const newPotion = await Potion.create({
      ...req.body,
      ingredients: req.body.ingredients.split(' '),
    })
    res.redirect(`/potions/${newPotion._id}`)
  } catch (error) {
    console.log(error)
  }
})

// route to get one potion
router.get('/:potionId', async (req, res, next) => {
  try {
    console.log(req.query)
    const potion = await Potion.findById(req.params.potionId)
    res.render('potions/one', { potion: potion, query: req.query })
    // conditional in case potions is not found in the DB
  } catch (error) {
    console.log(error)
  }
})

// route to POST update potion
router.post('/:potionId', async (req, res, next) => {
  try {
    const editPotion = await Potion.findByIdAndUpdate(
      req.params.potionId,
      {
        ...req.body,
        ingredients: req.body.ingredients.split(' '),
      },
      { new: true }
    )
    res.redirect(`/potions/${editPotion._id}`)
  } catch (error) {
    console.log(error)
  }
})

// route to delete potion
router.get('/:potionId/delete', async (req, res, next) => {
  try {
    await Potion.findByIdAndDelete(req.params.potionId)
    res.redirect('/potions')
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
