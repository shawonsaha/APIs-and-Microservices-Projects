// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function(req, res) {
  res.json({ greeting: "hello API" });
});

//---------------
// Timestamp api
//---------------


//date_string is optional (?)
app.get("/api/timestamp/:date_string?", function(req, res) {
  //req.param.date_string catch user input
  //.parse() converts (2015-12-25) to (1451001600000)
  let param = Date.parse(req.params.date_string)
  //.toUTCString() converts "2015-12-25T00:00:00.000Z" to UTC format
  let utc = new Date(param).toUTCString();
  
  //if user put millisec/unix instead of valid date format
  if(isNaN(param)){
    //no need to parse cause it's already in unix/millisec
    param = req.params.date_string
    //intup should be parse to Int to avoid invalid date
    utc = new Date(parseInt(param)).toUTCString()
  }
  
  //if user don't put any date
  if (param === undefined){
    //it store current time
    param = Date.now()
    utc = new Date(parseInt(param)).toUTCString();
  }
  
  //if user put a valid date or unix value
  if (utc !== "Invalid Date") {
    res.json({
      //convert param from string to integer
      unix: parseInt(param),
      utc
    });
  } else {
    res.json({ error: utc});
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
