var mysql = require('mysql')

var pool = mysql.createPool({
	connectionLimit: 10,
	host: 'classmysql.engr.oregonstate.edu',
	user: 'cs340_davisalt',
	password: '3985',
	database: 'cs340_davisalt'

})


module.exports.pool = pool;