const express = require('express');
const Card = require('../../models/card');
const route = express.Router();
route.delete('/', async (req, res) => {
  try {
    let card=Card.findById(req.body.id);
    if(!card){
      return res.status(400).json({ errors: errors.array() });
    }
    card= await Card.findByIdAndDelete(req.body.id)
    res.status(200).json({"success":"your raminder is deleted",card:card})
  } catch (err) {
    res.json({ errors: 'please enter a valid email', message: err.message })
  }
})
module.exports = route