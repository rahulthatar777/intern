const express = require('express');
const Bucket = require('../../models/bucket');
const route = express.Router();
const { body, validationResult } = require('express-validator');
route.post('/', [body('bucketname', 'Enter a valid name').isLength({ min: 3 })], async (req, res) => {
  const errors = validationResult(req);
  var today = new Date();
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const bucket = await Bucket.create({
      bucketname: req.body.bucketname,
      bucketdescription:req.body.bucketdescription,
      date: today
    })
    res.status(200).json({ bucket })
  } catch (err) {
    res.json({ errors: 'please enter a valid detail', message: err.message })
  }
})
module.exports = route