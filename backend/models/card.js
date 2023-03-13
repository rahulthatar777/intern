const mongoose=require('mongoose')
const { Schema } = mongoose;

const cardSchema = new Schema({
    cardlink:{
        type:String,
        required:true
    },
    bucketid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'bucket',
        required:true,
    },
    cardname:{
        type: String,
        unique:true
    },
    date:{
        type: String,
        default:Date.now
    }
  });
module.exports = mongoose.model('card',cardSchema);
  