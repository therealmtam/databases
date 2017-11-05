/* You'll need to
 *   npm install sequelize
 * before running this example. Documentation is at http://sequelizejs.com/
 */

var Sequelize = require('sequelize');
module.exports.db = new Sequelize('chat', 'student', 'student');
/* TODO this constructor takes the database name, username, then password.
 * Modify the arguments if you need to */

/* first define the data structure by giving property names and datatypes
 * See http://sequelizejs.com for other datatypes you can use besides STRING. */
module.exports.users = db.define('users', {
  username: Sequelize.STRING
});

module.exports.rooms = db.define('rooms', {
  roomname: Sequelize.STRING
});

module.exports.messages = db.define('messages', {
  text: Sequelize.STRING
});

messages.belongsTo(users);
users.hasMany(messages);

messages.belongsTo(rooms);
rooms.hasMany(messages);

/* Sequelize comes with built in support for promises
 * making it easy to chain asynchronous operations together */
users.sync()
  .then(function() {
    // Now instantiate an object and save it:
    return users.create({username: 'Jean Valjean'});
  })
  .then(function() {
    // Retrieve objects from the database:
    return users.findAll({ where: {username: 'Jean Valjean'} });
  })
  .then(function(results) {
    results.forEach(function(user) {
      console.log(user.username + ' exists');
    });
    db.close();
  })
  .catch(function(err) {
    // Handle any error in the chain
    console.error(err);
    db.close();
  });
