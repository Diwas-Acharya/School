var express = require('express');
var path = require("path");
var mongoose = require('mongoose');
var assert = require("assert");
require("../db/conn");
// var Studentinfo = require("../models/studentSchema");
var router = express.Router();

var mongoose = require("mongoose");

var Student = mongoose.Schema({
    roll_no : {
        type : Number,
        required : true
    },
    standered : {
        type : Number,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true
    }
})


var Studentinfo = mongoose.model("Student" , Student);




router.get("get/:class/:roll_no" , (req , res) =>{
    Studentinfo.find({standered: req.params.class, roll_no : req.params.roll_no}, 
   function(err, response){
      if(response[0]){res.json(response[0])}
      else{res.json({"Status":"Not Found"})}
});
});

router.get("/add" , (req , res) =>{
    res.sendFile(path.join(__dirname , "../views/add.html"));
});


router.post("/add" , (req , res) =>{
    var StudentInfo = req.body;

        const newStuent = new Studentinfo({
            roll_no : StudentInfo.id,
            standered : StudentInfo.class,
            name : StudentInfo.name,
            address : StudentInfo.address
        });
        
        newStuent.save()
        .then(() =>res.send(`<h4>Added Successfully</h4><br><a href="/info/add">Add More</a>`))
        .catch((err) => res.send(`<h4>Please Enter Propper Details</h4><br><a href="/info/add">Add Again</a>`));

});



router.get("/search" , (req , res)=>{
    res.render("search")
});

router.post("/search" , (req , res) =>{
    var data = req.body;
    var found = false;
    Studentinfo.find({standered: data.class, roll_no : data.id}, 
        function(err, response){
           if(response[0]){
               var student = {
                   id : response[0]._id,
                   class : response[0].standered,
                   roll_no : response[0].roll_no,
                   name : response[0].name,
                   address : response[0].address
               }
               res.render("edit" , student)}
           else{res.render("search" , {NotFound : true});}
     });
});

router.post("/edit" , (req , res)=>{
    var data = req.body;
    Studentinfo.findByIdAndUpdate(req.body.id,
         {
             standered : data.class,
             roll_no : data.roll,
             name : data.name,
             address : data.address
        }, 
   function(err, response){
      res.setHeader("script", 200);
      res.send(`<script>if(!alert("Update Sucessfully")) document.location = '/info/add';</script>`)
});
});

router.get("/del/delete/:p_id" , (req , res )=>{
    Studentinfo.findByIdAndRemove(req.params.p_id, function(err, response){
        if(err) res.send(`<script>if(!alert("Delete Failed ! Try Again"))</script>`);
        else res.send(`<script>if(!alert("Delete Sucessfully")) document.location = '/info/add';</script>`);
     });
});

module.exports = router;