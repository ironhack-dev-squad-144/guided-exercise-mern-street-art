const express = require('express')
const StreetArt = require('../models/StreetArt')
const Visit = require('../models/Visit')
const { isLoggedIn } = require('../middlewares')
const router = express.Router()

// Route protected for logged in user
router.get('/my-visits', isLoggedIn, (req, res, next) => {
  Visit.find({ _user: req.user._id })
    .populate('_streetArt')
    .then(visits => {
      res.json(visits)
    })
    .catch(next)
})

// POST /api/visits/
router.post('/visits', isLoggedIn, (req, res, next) => {
  let { _streetArt } = req.body
  // First: check if the user has a visit for the streetArt
  Visit.findOne({ _user: req.user._id, _streetArt }).then(visit => {
    if (visit) {
      next({
        status: 409,
        message: 'The logged in user has already visited the streetArt',
      })
    } else {
      // Second: create the visit
      Visit.create({ _user: req.user._id, _streetArt })
        .then(visit => {
          res.json(visit)
        })
        .catch(next)
    }
  })
})

// DELETE /api/visits/:visitId
router.delete('/visits/:visitId', isLoggedIn, (req, res, next) => {
  let visitId = req.params.visitId
  Visit.findById(visitId).then(visit => {
    if (!visit) {
      next({
        status: 400,
        message: 'There is no visit with the _id = ' + visitId,
      })
    } else if (visit._user.toString() !== req.user._id.toString()) {
      next({
        status: 403,
        message: 'You are not the owner of the visit',
      })
    } else {
      Visit.findByIdAndDelete(visitId).then(() => {
        res.json({ message: 'The visit was successfully deleted' })
      })
    }
  })
})

module.exports = router
