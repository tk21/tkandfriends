//dependencies for each module used
var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express-handlebars');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var dotenv = require('dotenv');
var pg = require('pg');
var app = express();

//client id and client secret here, taken from .env
dotenv.load();

//connect to database
var conString = process.env.DATABASE_CONNECTION_URL;

//configures the Template engine
app.engine('handlebars', handlebars({defaultLayout: 'layout'}));
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({ secret: 'keyboard cat',
                  saveUninitialized: true,
                  resave: true}));

//set environment ports and start application
app.set('port', process.env.PORT || 3000);

//routes
app.get('/', function (req, res) {
  res.render('index');
  console.log("index should be rendered.")
});

//render bar chart
app.get('/bars', function (req, res) {
  res.render('bars');
  console.log(req.query);
  console.log("Attempted to render bar chart.");
});

//retrieve data 
app.get('/delphidata', function (req, res) {
  console.log("----------------------- APPJS: DELPHIDATA------------------");
  console.log("THIS IS ONLY FILTERS OF QUERY:");
  console.log(req.query.f);

  var db = req.query.categories;
  var filters = req.query.f;
  var education = "hhsa_san_diego_demographics_education_2012_norm";
  var industry = "hhsa_san_diego_demographics_occupat_indust_2012_norm";
  var mar_status = "hhsa_san_diego_demographics_marital_status_2012_norm";


  //SELECT.....
  var query = "SELECT * FROM ";


  //FROM....... (database)
  query += db.split(" ")[0] + " ";


  //WHERE....... (filters)
  query += "WHERE \"" + category + "\"=\'" + 


  // initialize connection pool 
  pg.connect(conString, function(err, client, done) {
    if(err) return console.log(err);
    
    //console.log("DELPHI DATA-----------------------------------------------------\n");
    //console.log("Retrieving: hhsa_san_diego_demographics_occupat_industry_2012_norm");
    /**
    var query = 'SELECT * FROM hhsa_san_diego_demographics_occupat_industry_2012_norm';
    //query += '  WHERE \"Industry\"=\'Utilities\'';
    console.log("this is your query:");
    console.log(query);

    client.query(query, function(err, result) {
      // return the client to the connection pool for other requests to reuse
      done();

      res.writeHead("200", {'content-type': 'application/json'});
      res.end(JSON.stringify(result.rows));
    });**/
  }); 
});

http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});