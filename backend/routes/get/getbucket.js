const express = require('express');
const Bucket = require('../../models/bucket');
const route = express.Router();
route.post('/', async (req, res) => {
  try {
    const bucket = await Bucket.find()
    res.status(200).json({bucket})
  } catch (err) {
    res.json({ errors: 'please enter a valid detail', message: err.message })
  }
})
module.exports = route