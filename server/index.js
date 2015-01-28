// nodejs test data server, just skeleton 
var express = require("express");
var _ = require("lodash")
var bodyParser = require("body-parser")
var path = require('path')

var app = express();

app.use(bodyParser.json());

var getPort = function () {
  return Number(process.env.PORT || 3000);
}

var getCounters = function() {
  return randomCounters
}

var getMetrics = function() {
  return randomMetrics
}

var counters = {}
var metrics = {}

app.get("/counters", function(req, res, next) {
    res.json(getCounters());
  })

app.post("/metrics", function(req, res, next) {
    res.json(getMetrics());
  })

app.listen(getPort(), function() {
  console.log("----------------------------------------------------")
  console.log("  Server is running on port:", getPort());
  console.log("----------------------------------------------------")
});