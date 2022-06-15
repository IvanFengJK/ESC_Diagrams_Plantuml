// node-app-esc.js
// where your node app starts

// init project
const express = require('express');
const app = express();


// http://expressjs.com/en/starter/static-files.html
app.use(express.static('.'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/index.html');
  response.end();
});

app.get('/about', function(request, response) {
  response.sendFile(__dirname + '/about.html');
  response.end();
});

app.get('/contact', function(request, response) {
  response.sendFile(__dirname + '/contact.html');
  response.end();
});

app.get('/contact', function(request, response) {
  response.sendFile(__dirname + '/contact.html');
  response.end();
});

// listen for requests :)
const listener = app.listen("3000", function() {
  console.log('Your app is listening on port ' + listener.address().port);
});

app.use((request, response, next) => {
  response.status(404).sendFile(__dirname + '/404_error.html');
})

