global.db = require('./db');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000; // Porta padrão

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

//Definindo as rotas
const router = express.Router();
router.get('/', (req, res) => res.json({
    message: 'Funcionando !!'
}));

router.get('/teste', (req, res) => res.json({
    message: "Estou em teste"
}));

router.get('/clientes', (req, res) => global.db.listarClientes((err, docs) => {
    if(err) res.status(500).json(err);
    else res.json(docs)
}));

router.get('/cliente/:id', (req, res) => global.db.listarCliente(req.params.id, (err, doc) => {
    if(err) res.status(500).json(err);
    else res.json(doc)
}));

router.post('/clientes', (req,res) => {
    const customer = req.body;
    global.db.inserirCliente(customer, (err, result) => {
        if(err) res.status(500).json(err);
        else res.json({message: 'Cliente cadastrado com sucesso !!!'});
    });
});

//Necessário informar todos os campos da collection
router.put('/clientes/:id', (req, res) => {
    const id = req.params.id;
    const customer = req.body;
    global.db.atualizarCliente(id, customer, (err, result) => {
        if(err) res.status(500).json(err);
        else res.json({message: 'Cliente atualizado com sucesso !!!'});
    });
});

//Necessário informar somente o campo a ser atualizado
router.patch('/cliente/:id', (req, res) => {
    const id = req.params.id;
    const update = req.body;
    global.db.atualizandoCliente(id, update, (err, result) => {
        if(err) res.status(500).json(err);
        else res.json({message: 'Cliente Atualizado com sucesso !!!'});
    })
})

router.delete('/cliente/:id', (req, res) => {
    const id = req.params.id;
    global.db.deletarCliente(id, (err, result) => {
        if(err) res.status(500).json(err);
        else res.json({message: 'Cliente Excluído com sucesso !!!'});
    })
})

app.use('/', router);

//Inicia o servidor
app.listen(port);
console.log('API funcionando !!!');