const express = require('express');
const router = require('./routes/productos');
const PORT = 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.set('view engine', 'pug');
app.set('views', './views');

app.use('/', router);

app.listen(PORT, () => {
    console.log(`Servidor running on port ${PORT}`);
});
