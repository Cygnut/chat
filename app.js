const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const animalNamer = require('animal-namer');
const ms = require('./Messages');


var app = express();
app.use(express.static('public'));
app.use(bodyParser.json()); // for parsing application/json in requests.

// Debug functions: 
function writeString(s, path)
{
	fs.writeFile(path, s, function(err) {
		if(err) {
			return console.log(err);
		}
	}); 
}

function writeJsonObject(o, path)
{
	writeString(JSON.stringify(o, null, 2));
}

// Server api: 

var namer = new animalNamer();
var msgs = new ms.Messages(null);

/*
	Send a message to the named chatroom.
	{
		//room: "secretRoom", - for now there's only one global room
		from: "username",
		content: "hello I'm Lee",
	}
*/
app.post('/send', function (req, res) {
	
	var newMsgId = msgs.push({
		from: req.body.from,
		content: req.body.content,
	});
	
	console.log('Received message #' + newMsgId + ': ' + req.body.from + ': ' + req.body.content);
	
	res.json({ id : newMsgId });
});

app.get('/messages', function (req, res) {
	
	var allMsgs = msgs.get();
	
	// With this transformation, this endpoint is array.prototype.slice with documentation from https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
	var begin = req.query.begin === undefined ? 0 : parseInt(req.query.begin);
	var end = req.query.end === undefined ? allMsgs.length : parseInt(req.query.end);
	
	res.json(allMsgs.slice(begin, end));
});

app.get('/user', function (req, res) {
	
	namer.name().then(function(name) {
		res.json({ user : name })
	});
});

var server = app.listen(81, function () {
	
	var host = server.address().address
	var port = server.address().port
	
	console.log("App listening at http://%s:%s", host, port)
});
