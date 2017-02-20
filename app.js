var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var lobRouter = require('./routers/lob');
var subLobRouter = require('./routers/sub_lob');
var projectRouter = require('./routers/project');

var app = express();

var PORT = 8080;
var HOST_NAME = 'localhost';
var DATABASE_NAME = 'project';

mongoose.connect('mongodb://' + HOST_NAME + '/' + DATABASE_NAME);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static(__dirname + '/public'));

app.use('/api', lobRouter);
app.use('/api', subLobRouter);
app.use('/api', projectRouter);

app.get("*", function(req, res){
	res.sendFile(__dirname + '/public/app/views/index.html')
});

app.listen(PORT, function () {
  console.log('Listening on port ' + PORT);
});


