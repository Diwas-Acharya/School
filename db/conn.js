var path = require("path");
const dotenv = require("dotenv");
var mongoose = require('mongoose');

dotenv.config({ path: './config.env'})
const DB = process.env.DATABASE;

mongoose.connect(DB,
 { useNewUrlParser: true ,
     useUnifiedTopology: true,
     useCreateIndex: true,
     useFindAndModify : false
      } ).then(()=>{
    console.log("Connection sucessfull");
 }).catch((e) =>{
     console.log("Not connected");
 });


// mongoose.connect('mongodb://localhost/student',
//  { useNewUrlParser: true , useUnifiedTopology: true  } ).then(()=>{
//     console.log("Connection sucessfull");
//  }).catch((e) =>{
//      console.log("Not connected");
//  });

//  mongoose.set('useFindAndModify', false);