const express = require('express'),
  app = express(),
  bodyParser = require('body-parser');
  port = process.env.PORT || 3307;

const path = require('path');
var cors = require('cors');
app.use(cors());
app.options('*',cors());

require('dotenv').config()

//Cors
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.all('/', function(req, res, next) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end('Welcome to Express!');
});


//body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//Listening Port

var router = express.Router();

var loginRoutes = require('./app/route/loginRoutes.js'); //importing route
loginRoutes(app); //register the route


module.exports=app;
app.listen(port);
console.log('API server started on: ' + port);