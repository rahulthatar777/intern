const express = require('express');
const router = express.Router();
const Card = require('../../models/card');
router.post('/' ,async(req,res)=>{
    try{
        const{id} = req.body;
            let filter = {_id: id};
            let update = {cardlink: req.body.cardlink,bucketid: req.body.newbucketid,cardname: req.body.cardname,};
            let card = await Card.findOneAndUpdate(filter, update ,{new : true});
            return res.status(200).json({card});
    }
    catch(error){
        console.log(error);
       return res.status(500).json({err:error.message});
    }

})

module.exports = router;