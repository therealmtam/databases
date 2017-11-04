var mysql = require('mysql'); 

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".


module.exports.connection = mysql.createConnection({
  host: 'localhost',
  user: 'student',
  password: 'student',
  database: 'chat'
});

module.exports.connection.connect(function(err) {
  if (err) {
    console.log(err);
    throw err;
  }
  console.log('This is connected!');
});