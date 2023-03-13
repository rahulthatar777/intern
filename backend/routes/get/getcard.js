const express = require('express');
const Card = require('../../models/card');
const route = express.Router();
route.post('/', async (req, res) => {
  try {
    const card = await Card.find({bucketid:req.body.bucketid}).populate('bucketid','bucketname');
    console.log(req.body.bucketid)
    res.status(200).json({card})
  } catch (err) {
    res.json({ errors: 'please enter a valid detail', message: err.message })
  }
})
module.exports = route