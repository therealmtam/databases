var db = require('../db');

module.exports = {
  messages: {
    get: function (callback) {
      
      var sql = 'SELECT messages.text, messages.createdAt, messages.id, rooms.roomname, users.username FROM messages INNER JOIN users ON messages.username = users.id INNER JOIN rooms ON rooms.id = messages.roomname';
      
      db.connection.query(sql, (error, results) => {
        if (error) {
          console.log(error);
        } else {
          callback (results);
        }
      });
      
    }, // a function which produces all the messages
    post: function (message, callback) {
      
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