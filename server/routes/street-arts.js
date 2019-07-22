const express = require('express')
const StreetArt = require('../models/StreetArt')
const router = express.Router()
const uploader = require('../configs/cloudinary')

// Route: GET /api/street-arts
router.get('/', (req, res, next) => {
  StreetArt.find()
    .then(streetArts => {
      res.json(streetArts)
    })
    .catch(err => next(err))
})

// Route: GET /api/street-arts/:id
router.get('/:id', (req, res, next) => {
  StreetArt.findById(req.params.id)
    .then(streetArt => {
      res.json(streetArt)
    })
    .catch(next)
})

// Route to create a street art
// `uploader.single('picture')` parses the data send with the name `picture` and save information inside `req.file`
router.post('/', uploader.single('picture'), (req, res, next) => {
  let { lat, lng } = req.body
  let pictureUrl = req.file.url

  StreetArt.create({
    pictureUrl,
    location: {
      coordinates: [lng, lat],
    },
  })
    .then(streetArt => {
      res.json(streetArt)
    })
    .catch(next)
})

module.exports = router
