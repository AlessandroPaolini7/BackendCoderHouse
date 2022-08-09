const Contenedor = require('./main.js');
const express = require('express');

const PORT = 8080;
const app = express();
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}).on('error', err => { console.log(err); } );

const products = new Contenedor('products.txt');

app.get('/', async (req, res) => {
    await res.send('Cambia la ruta por /products o /randomProduct');
});


app.get('/products', async (req, res) => {
    const array = await products.getAll();
    if(array.length > 0){
        res.send(array);
    }else{
        res.status(500).send('No hay productos');
    }
});

app.get('/randomProduct', async (req, res) => {
    const rp = await products.getAll();
    const random = Math.floor(Math.random() * rp.length);
    if(rp.length > 0){
        res.send(rp[random]);
    }else {
        res.status(500).send('No se encontraron productos');
    }
});

//Quise hacerlo de esta manera ya que lo encuentro más óptimo pero no entiendo porque no funciona.

// app.get('/randomProduct', async (req, res) => {
//     const rp = await products.getById(Math.floor(Math.random() * products.getAll().length));
//     if(rp != undefined){
//         res.send(rp);
//     }else {
//         res.status(500).send('No se encontraron productos');
//     }
// });