const express = require ('express');
const cors = require('cors');
const mongoose = require('mongoose');
const requireDir = require('require-dir')

//iniciando o App
const app = express();
app.use(express.json())
app.use(cors());

mongoose.connect('mongodb://localhost:27017/cursonode', {
    useNewUrlParser: true
});

requireDir ('./src/models');
app.use('/api', require('./src/routes'));


app.listen(3001);
console.log('server rodando na porta 3001')