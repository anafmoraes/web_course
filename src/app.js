const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// criação da aplicação
const app = express();

//Conecta ao banco
mongoose.connect('uri', () => console.log('Database connected'));

//Carregar os Models
const Product = require('./models/product');
const Category = require('./models/category');
const User = require('./models/user');

const indexRoutes = require('./routes');
const productRoutes = require('./routes/product');
const categoryRoutes = require('./routes/category');

//middleware para os requests que vier, ele converte o corpo para json
app.use(bodyParser.json()); // conteúdo é convertido para json
app.use(bodyParser.urlencoded({ extended: false })); // codificar as urls. exemplo: trocar espaço por %20

app.use('/', indexRoutes);

// boa prática colocar no plural
app.use('/products', productRoutes);
app.use('/categories', categoryRoutes);

// Erro para rotas não existentes
app.use((req, res) => {
  res.status(404).send('Route not found');
});

// exportar aplicação. Toda vez que a classe for importada, o app é retornado
module.exports = app;
