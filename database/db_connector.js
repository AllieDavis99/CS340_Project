var mysql = require('mysql')

var pool = mysql.createPool({
	connectionLimit: 10,
	host: 'classmysql.engr.oregonstate.edu',
	user: 'cs340_ocheretk',
	password: '1763',
	databse: 'cs340_ocheretk'

})

module.exports.pool = pool;