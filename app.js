#!/usr/bin/node

var m = require('mraa');
var express = require('express');
var app = express();
var myLed = new m.Gpio(44);
var port = process.env.PORT || 5000;

myLed.dir(m.DIR_OUT);

app.get('/', function(req, res) {
    res.send('Led is ' + (myLed.read()?'off.':'on.'));
});

app.get('/on', function(req, res) {
    myLed.write(0);                                   
    res.send('Led is ' + (myLed.read()?'off.':'on.'));
});

app.get('/off', function(req, res) {
    myLed.write(1);                                   
    res.send('Led is ' + (myLed.read()?'off.':'on.'));
});

app.listen(port);