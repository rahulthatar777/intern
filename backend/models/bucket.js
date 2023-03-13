const mongoose=require('mongoose')
const { Schema } = mongoose;

const bucketSchema = new Schema({
    bucketname:{
        type: String,
        unique:true
    },
    bucketdescription:{
        type: String
    },
    date:{
        type: String,
        default:Date.now
    }
  });
module.exports = mongoose.model('bucket',bucketSchema);
  