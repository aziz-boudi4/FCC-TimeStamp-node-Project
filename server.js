// server.js
// where your node app starts

// init project
var express = require('express');
var moment = require('moment');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


// Aziz work
app.get("/api/timestamp/:date_string?", function (req,res) {

  let unixResult = 0;
  let utcResult = "";

  // regex to check if format is XXXX-XX-XX (if it has a dash)
  let regex = /(-)/;

  // Grab the date_string from the URL
  let userDateString = req.params.date_string;
        // if empty string ''
        if (userDateString === undefined) {
          userDateString =  Date.now();
          unixResult = userDateString;
          utcResult = moment().format('ddd, D MMM YYYY h:mm:ss Z');
        }

        // if userDateString is unix time 1450137600
        if (typeof(userDateString) === 'string') {
          let doesItContainDash = regex.test(userDateString)

          // 1- if !doesItContainDash === true (it means its unix time eg: 1450137600)
          if(!doesItContainDash) {
            unixResult = Number(userDateString);
            utcResult = moment.unix(unixResult).format('ddd, D MMM YYYY h:mm:ss Z');
          }

          // 2- if doesItContainDash === true (it means its unix time eg: 2015-12-25)
          if(doesItContainDash) {
            unixResult = new Date('2015-12-25').getTime();
            utcResult = moment(unixResult).format('ddd, D MMM YYYY h:mm:ss Z');
          }
        }


  res.send({
    "unix": unixResult,
    "utc": utcResult
  });

});

// listen for requests :)
// https://stackoverflow.com/questions/23647593/nodemon-express-listen-port
app.set('port', 3001);
var listener = app.listen(app.get('port'), function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
