//Tutorial api node e mysql

const mysql = require('mysql');
const minhaConnection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'admin',
    password: 'Saadmin',
    database: 'workshop'
});

minhaConnection.connect(function (err) {
    if (err) return console.log(err);
    console.log('conectou!');
    createTable(minhaConnection);
    
})

function createTable(conn) {

    const sql = "CREATE TABLE IF NOT EXISTS clientes (\n" +
        "ID int NOT NULL AUTO_INCREMENT,\n" +
        "Nome varchar(150) NOT NULL,\n" +
        "CPF char(11) NOT NULL UNIQUE,\n" +
        "PRIMARY KEY (ID)\n" +
        ");";

    conn.query(sql, function (error, results, fields) {
        if (error) return console.log(error);
        console.log('criou a tabela!');
        addRows(conn);
    });
}


function addRows(conn) {
    const sql = "INSERT INTO clientes(Nome,CPF) VALUES ?";
    const values = [
        ['teste1', '12345678901'],
        ['teste2', '09876543210'],
        ['teste3', '12312312399'],
        ['teste4', '12312312390']
    ];
    conn.query(sql, [values], function (error, results, fields) {
        if (error) return console.log(error);
        console.log('adicionou registros!');
        conn.end();//fecha a conexão
    });
}