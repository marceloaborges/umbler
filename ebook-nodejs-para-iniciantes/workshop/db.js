var mongoClient = require('mongodb').MongoClient;

mongoClient.connect("mongodb://localhost/workshop")
	.then(conn => global.conn = conn.db("workshop"))
	.catch(err => console.log('err'))


function findALL(callback){
	global.conn.collection('customers').find({}).toArray(callback);
}

function insert(customers, callback){
	global.conn.collection('customers').insert(customers, callback);
}

function deleteOne(id, callback){
	global.conn.collection('customers').deleteOne({_id: new ObjectId(id)}, callback);
}


module.exports = { findALL, insert, deleteOne }