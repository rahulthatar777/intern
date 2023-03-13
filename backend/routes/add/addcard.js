const express = require('express');
const Card = require('../../models/card');
const route = express.Router();
const { body, validationResult } = require('express-validator');
route.post('/', [body('cardname', 'Enter a valid name').isLength({ min: 3 })], async (req, res) => {
  const errors = validationResult(req);
  var today = new Date();
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const card = await Card.create({
      cardname: req.body.cardname,
      bucketid: req.body.bucketid,
      cardlink: req.body.cardlink,
      date: today
    })
    res.status(200).json({ card })
  } catch (err) {
    res.json({ errors: 'please enter a valid detail', message: err.message })
  }
})
module.exports = route