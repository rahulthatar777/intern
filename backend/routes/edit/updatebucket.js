const express = require('express');
const router = express.Router();
const Bucket = require('../../models/bucket');

router.post('/' ,async(req,res)=>{
    try{
        const{id} = req.body;
            let filter = {_id: id};
            let update = {
                bucketname: req.body.bucketname,
                bucketdescription:req.body.bucketdescription
            };
            let bucket = await Bucket.findOneAndUpdate(filter, update ,{new : true});
            return res.status(200).json({bucket});
    }
    catch(error){
        console.log(error);
       return res.status(500).json({err:error.message});
    }

})

module.exports = router;