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
module.exports.users = module.exports.db.define('users', {
  username: {
    type: Sequelize.STRING,
    unique: true
  }
});

module.exports.rooms = module.exports.db.define('rooms', {
  roomname: {
    type: Sequelize.STRING,
    unique: true
  }
});

module.exports.messages = module.exports.db.define('messages', {
  text: Sequelize.STRING
});

module.exports.messages.belongsTo(module.exports.users);
module.exports.users.hasMany(module.exports.messages);

module.exports.messages.belongsTo(module.exports.rooms);
module.exports.rooms.hasMany(module.exports.messages);

/* Sequelize comes with built in support for promises
 * making it easy to chain asynchronous operations together */
// module.exports.users.sync()
//   .then(function() {
//     // Now instantiate an object and save it:
//     return module.exports.users.create({username: 'Jean Valjean'});
//   .then(function() {
//     // Retrieve objects from the database:
//     module.exports.users.findAll({where: {username: 'Jean Valjean'}});
//     return module.exports.messages.create({ username: 'Jean Valjean', roomname: 'lobby', text: 'Hello there!' });
//   })
//   .then(function(results) {
//     results.forEach(function(user) {
//       console.log(user.username + ' exists');
//     });
//     module.exports.db.close();
//   })
//   .catch(function(err) {
//     // Handle any error in the chain
//     console.error(err);
//     module.exports.db.close();
//   });

// module.exports.messages.sync();
// module.exports.rooms.sync();
