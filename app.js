#!/usr/bin/node

require('daemon')();
var m = require('mraa');
var fs = require('fs');
var lineReader = require('line-reader');
var express = require('express');
var app = express();
var myLed = new m.Gpio(0);
var port = process.env.PORT || 5000;

myLed.dir(m.DIR_OUT);

app.get('/', function(req, res) {

    res.send('<h1>Light is ' + (myLed.read()?'off.':'on.') + '</h1>');

    logText = new Date().toJSON() + ": Info request.\n"
    fs.appendFile('myLinkIt.log', logText, function(err) { if (err) throw err; });

});


app.get('/on', function(req, res) {

    myLed.write(0);
    res.send('<h1>Light is ' + (myLed.read()?'off.':'on.') + '</h1>');

    logText = new Date().toJSON() + ": ON request.\n"
    fs.appendFile('myLinkIt.log', logText, function(err) { if (err) throw err; });

});


app.get('/off', function(req, res) {

    myLed.write(1);
    res.send('<h1>Light is ' + (myLed.read()?'off.':'on.') + '</h1>');

    logText = new Date().toJSON() + ": OFF request.\n"
    fs.appendFile('myLinkIt.log', logText, function(err) { if (err) throw err; });

});


app.get('/showlog', function(req, res) {

    var text = '';
    lineReader.eachLine('file.txt', function(line, last) {
        text += line + '<br>';
    });
    res.send(text);

});


app.listen(port);
