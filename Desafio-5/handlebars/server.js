const express = require('express');
const {engine} = require('express-handlebars');
const app = express();
const router = require('./routes/productos');
const PORT = 8080;


app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use('/', router);

app.listen(PORT, () => {
    console.log(`Servidor running on port ${PORT}`);
});