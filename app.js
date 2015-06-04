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
app.engine('handlebars', handlebars({
  defaultLayout: 'layout'
}));
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
  secret: 'keyboard cat',
  saveUninitialized: true,
  resave: true
}));

//set environment ports and start application
app.set('port', process.env.PORT || 3000);

//routes
app.get('/', function (req, res) {
  res.render('index');
  console.log("index should be rendered.")
});

//PIE CHART: when all data is queried for ONLY ONE region.
app.get('/pie', function (req, res) {
  res.render('pie');
});

//retrieve data 
app.get('/delphidata', function (req, res) {
  console.log("----------------------- APPJS: DELPHIDATA------------------");
  console.log("filters | category | region:");
  console.log(req.query.f);
  console.log(req.query.c);
  console.log(req.query.r);

  //var filters = 'Nursery/Preschool';
  var education = 'hhsa_san_diego_demographics_education_2012_norm';
  var industry = 'hhsa_san_diego_demographics_occupat_industry_2012_norm';
  var mar_status = 'hhsa_san_diego_demographics_marital_status_2012_norm';

  //SELECT.....
  var query = 'SELECT * FROM ';

  //FROM....... (database)
  switch (req.query.c) {
    case "Industry":
      query += industry + ' ';
      break;

    case "Education":
      query += education + ' ';
      break;

    case "Mar_status":
      query += mar_status + ' ';
      break;
  }

  //WHERE....... (filters)
  if (req.query.f) {
    switch (req.query.c) {
      case "Industry":
        query += 'WHERE "Industry" = \'';
        break;
      case "Education":
        query += 'WHERE "Education" = \'';
        break;
      case "Mar_status":
        query += 'WHERE "Marital Status" = \'';
        break;
    }
    query += filters + "\'";
  }

  //IF Querying for specific REGION
  if (req.query.r !== "") {
    if (req.query.f) {
      query += 'AND "Area"=\'' + req.query.r + '\'';
    }
    else
      query += 'WHERE "Area"=\'' + req.query.r + '\'';
  }
  

  console.log("finalized query:");
  console.log(query);

  // initialize connection pool, perform query
  pg.connect(conString, function (err, client, done) {
    if (err) return console.log(err);

    console.log("DELPHI DATA-----------------------------------------------------\n");
    client.query(query, function (err, result) {
      // return the client to the connection pool for other requests to reuse
      done();

      res.writeHead("200", {
        'content-type': 'application/json'
      });
      res.end(JSON.stringify(result.rows));
    });
  });
});

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});