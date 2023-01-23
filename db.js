var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', //
  password: '', //
  database: 'ytscrab',
})
connection.connect((err) => {
  if (err) {
    console.log(err)
    return
  }
})
module.exports = connection