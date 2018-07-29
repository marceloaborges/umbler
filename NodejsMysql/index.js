const express = require('express');
const app = express();
const bodyParser = require('body-parser');


//Configurações server
const port = 3000; //Porta padrão
const mysql = require('mysql');

//Configura a aplicação para utilizar o body-parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json()); 

//Criando o reteamento
const router = express.Router();
router.get('/', (req, res) => res.json({message: 'Funcionando'}));
router.get('/clientes/:id?', (req, res) => {
    let filter = '';
    if(req.params.id)
        filter = ' WHERE id =' + parseInt(req.params.id);
    execSQLQuery('SELECT * FROM clientes' + filter, res);
});
router.delete('/clientes/:id', (req, res) => {
    execSQLQuery('DELETE FROM clientes WHERE id = ' + parseInt(req.params.id), res);
});
router.post('/clientes', (req, res) => {
    const nome = req.body.nome.substring(0, 150);
    const cpf = req.body.cpf.substring(0, 11);
    execSQLQuery(`INSERT INTO Clientes(nome, cpf) VALUES('${nome}','${cpf}')`, res);
});
router.patch('/clientes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const nome = req.body.nome.substring(0, 150);
    const cpf = req.body.cpf.substring(0, 11);
    execSQLQuery(`UPDATE clientes SET nome='${nome}', cpf='${cpf}' WHERE id=${id}`, res);
});
app.use('/', router);

//Inicia o servidor
app.listen(port);
console.log('Api Funcionando !');

function execSQLQuery(sqlQry, res){
    const minhaConexao = mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'admin',
        password: 'Saadmin',
        database: 'workshop'
    });

    minhaConexao.query(sqlQry, function(error, results, fields){
        if(error)
            res.json(error);
        else
            res.json(results);
        minhaConexao.end();
        console.log('Executou a query corretamente !');
    });
}