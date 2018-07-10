const mongoClient =  require("mongodb").MongoClient;
mongoClient.connect("mongodb://localhost:27017/workshop")
    .then(conn => global.conn = conn.db("workshop"))
    .catch(err => console.log(err))

const ObjectId = require("mongodb").ObjectId;

function listarClientes(callback){
    global.conn.collection('customers').find().toArray(callback)
}

function listarCliente(id, callback){
    global.conn.collection('customers').findOne(new ObjectId(id), callback)
}

function inserirCliente(cliente, callback){
    global.conn.collection('customers').insert(cliente, callback)
}

//Necessário informar todos os campos da collection
function atualizarCliente(id, cliente, callback){
    global.conn.collection('customers').update({_id: new ObjectId(id)}, cliente, callback);
}

//Atualiza somente os campos informados
function atualizandoCliente(id, cliente, callback){
    global.conn.collection('customers').update({_id: new ObjectId(id)}, 
    { $set: cliente }, callback )
}

function deletarCliente(id, callback){
    global.conn.collection('customers').deleteOne({_id: new ObjectId(id)}, callback);
}

module.exports = { listarClientes, listarCliente, inserirCliente, atualizarCliente, atualizandoCliente, deletarCliente };