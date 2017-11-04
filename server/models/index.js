var db = require('../db');
var Promise = require ('bluebird');

module.exports = {
  messages: {
    get: function (callback) {
      
      var sql = 'SELECT messages.text, messages.createdAt, messages.id, rooms.roomname, users.username FROM messages INNER JOIN users ON messages.username = users.id INNER JOIN rooms ON rooms.id = messages.roomname';
      
      new Promise((resolve, reject) => {
        db.connection.query(sql, (error, results) => {
          if (error) {
            reject(error);
          } else {
            callback(results);
          }
        });
      });
      
    }, // a function which produces all the messages
    post: function (message, callback) {
      
      var roomname = message.roomname;
      var username = message.username;
      var text = message.text;
      
      var roomId;
      var usernameId;

      new Promise((resolve, reject) => {
        
        var sql = `SELECT id FROM rooms WHERE roomname = '${roomname}'`;
        db.connection.query(sql, (error, roomnames) => {
          if (error) {
            console.log('ERR IN ROOMIDSEARCH', error);
          } else {
            resolve (roomnames);
          }
        });
        
      }).then(roomnames => {
                
        if (roomnames[0]) {
          roomId = roomnames[0].id;
          return roomId;
        } else {

          return new Promise((resolve, reject) => {
            var sql = `INSERT INTO rooms (roomname) VALUES('${roomname}');`;
            db.connection.query(sql, (error, results) => {
              if (error) {
                console.log('ERR IN INSERTROOM', error);
              } else {
                roomId = results.insertId;
                resolve(results.insertId);
              }
            });
          });
        }
      }).then(roomId => {
        
        return new Promise((resolve, reject) => {
        
          var sql = `SELECT id FROM users WHERE username = '${username}'`;
          db.connection.query(sql, (error, usernames) => {
            if (error) {
              console.log('ERR IN USERIDSEARCH', error);
            } else {
              resolve (usernames);
            }
          });
          
        }).then(usernames => {
                  
          if (usernames[0]) {
            usernameId = usernames[0].id;
            return usernameId;
          } else {
            console.log('ABOUT TO INSERT USER');

            return new Promise((resolve, reject) => {
              var sql = `INSERT INTO users (username) VALUES('${username}');`;
              db.connection.query(sql, (error, results) => {
                if (error) {
                  console.log('ERR IN INSERTUSER', error);
                } else {
                  console.log('USERINSERT', results);
                  usernameId = results.insertId;
                  resolve(results.insertId);
                }
              });
            });
          }
        });
      
      }).then(userId => {
        
        return new Promise((resolve, reject) => {
          //console.log(usernameId);
          var sql = `INSERT INTO messages (text, username, roomname) VALUES ('${text}', ${usernameId}, ${roomId});`;
          
          db.connection.query(sql, (error, insertMsgResult) => {
            if (error) {
              console.log('ERR IN INSERT MESSAGE', error);
            } else {
              resolve (insertMsgResult);
            }
          });
        });
      }).then(insertMsgResult => {
        callback(201);
      });
      
      
      
      //Check for roomname id
        //If UNDEFINED
            // Write room to DB 
            // save new ID
        //ELSE IF ID returned
            //save roomId
      
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};