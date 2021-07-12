const express = require("express");
const route = require('./routes/apis.js')
var bodyParser = require('body-parser');
var path = require("path");
var multer = require('multer');
var hbs = require( 'express-handlebars' )



var upload = multer();
const app = express();
app.use("/static" , express.static('static'));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(upload.array()); 

app.engine( 'hbs', hbs( { 
    extname: 'hbs', 
    defaultLayout: 'main', 
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/'
  } ) );
  
  app.set( 'view engine', 'hbs' );

app.use("/info" , route);
app.get("/" , (req ,res) =>{
    res.sendFile(path.join(__dirname , "./views/add.html"));
});

app.use(function (req,res,next){
	res.status(404).sendFile(path.join(__dirname , "/views/404.html"));
});

app.listen(3000);