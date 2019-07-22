const express = require('express')
const StreetArt = require('../models/StreetArt')
const router = express.Router()

// Route: GET /api/street-arts
router.get('/', (req, res, next) => {
  StreetArt.find()
    .then(streetsArts => {
      res.json(streetsArts)
    })
    .catch(err => next(err))
})

// Route: GET /api/street-arts/:id
router.get('/:id', (req, res, next) => {
  StreetArt.findById(req.params.id)
    .then(streetsArt => {
      res.json(streetsArt)
    })
    .catch(next)
})

module.exports = router
