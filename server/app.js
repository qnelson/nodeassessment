var express =  require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
//routes variables
var animals = require('./routes/animals');
var randomNumber = require('./routes/randomNumber');

app.use(bodyParser.urlencoded({ extended: true }));
//routes
app.use('/animals', animals);
app.use('/randomNumber', randomNumber);

// Catchall route
app.get('/*', function (req, res) {
  var file = req.params[0] || '/views/index.html';
  res.sendFile(path.join(__dirname, './public', file));
});

//port stuff
app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function () {
  console.log('Listening on port ', app.get('port'));
});
