const express = require('express');
const Card = require('../../models/card');
const route = express.Router();
route.delete('/', async (req, res) => {
  try {
    var cardarray =[]
    cardarray = req.body.cardarray;
    var cards = []
    console.log(cardarray)
    for (var i = 0; i < cardarray.length; i++){
      let card = Card.findById(cardarray[i]);
      console.log(cardarray[i])
      if (!card) {
        card=[]
        cards.push(card);
   
      } else {
        card = await Card.findByIdAndDelete(cardarray[i])
        cards.push(card);
    
      }
    }
    res.status(200).json({ "success": "your raminder is deleted", card: cards })
  } catch (err) {
    res.json({ errors: 'please enter a valid email', message: err.message })
  }
})
module.exports = route