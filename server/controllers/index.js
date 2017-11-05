var models = require('../models');
var parser = require('querystring');

var headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'application/json'
};

module.exports = {
  messages: {
    get: function (req, res) {
      var results = models.messages.get(messageResults => {
        var messages = JSON.stringify({results: messageResults});
        res.writeHead(200, headers);
        res.write(messages);
        res.end();
      });
      //res.end(JSON.stringify({results: [{username: "Max", text: "Waffles", roomname: "lobby"}]}));
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      
      var data = '';
      req.on('data', function(chunk) {
        data += chunk;
      });
      
      req.on('end', function() {
        models.messages.post(parser.parse(data), statusCode => {
          console.log('STATUS', statusCode);
          res.writeHead(201, headers);
          res.end('{}');
        });
      });
    } // a function which handles posting a message to the database
  },


  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {}
  }
};

// [ RowDataPacket {
//     id: 1,
//     name: 1,
//     room: 2,
//     message: 'Hello there!',
//     createdAt: 2017-11-03T23:43:58.000Z },
//   RowDataPacket {
//     id: 2,
//     name: 1,
//     room: 2,
//     message: 'Hello there!',
//     createdAt: 2017-11-03T23:44:25.000Z } ]
 
 
    
//   RowDataPacket {
//   id: 1,
//   name: 1,
//   room: 2,
//   message: 'Hello there!',
//   createdAt: 2017-11-03T23:43:58.000Z }


