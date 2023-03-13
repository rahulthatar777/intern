const express = require('express')
const mongoose = require('mongoose');
const app = express()
const port = 3001
var cors = require('cors')
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('hello world')
})

// url routes
app.use('/app/addbucket',require('./routes/add/addbucket'))
app.use('/app/addcard',require('./routes/add/addcard'))
app.use('/app/getcard',require('./routes/get/getcard'))
app.use('/app/getbucket',require('./routes/get/getbucket'))
app.use('/app/deletebucket',require('./routes/delete/deletebucket'))
app.use('/app/deletecard',require('./routes/delete/deletecard'))
app.use('/app/deletecardmultiple',require('./routes/delete/deletecardmultiple'))
app.use('/app/updatebucket',require('./routes/edit/updatebucket'))
app.use('/app/updatecard',require('./routes/edit/updatecard'))

app.listen(process.env.PORT||port, () => {
  console.log(`Example app listening on port ${port}`)
})

mongoose 
 .connect("mongodb+srv://Manishsingh:manish0302@cluster0.oayyb.mongodb.net/bucket", {
        useNewUrlParser: true,
        useUnifiedTopology: true,  })   
 .then(() => console.log("Database connected!"))
 .catch(err => console.log(err));