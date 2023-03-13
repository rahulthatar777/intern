const express = require('express');
const Bucket = require('../../models/bucket');
const route = express.Router();
route.delete('/', async (req, res) => {
  try {
    let bucket=Bucket.findById(req.body.id);
    if(!bucket){
      return res.status(400).json({ errors: errors.array() });
    }
    bucket= await Bucket.findByIdAndDelete(req.body.id)
    res.status(200).json({"success":"your bucket is deleted",bucket:bucket})
  } catch (err) {
    res.json({ errors: 'please enter a valid email', message: err.message })
  }
})
module.exports = route