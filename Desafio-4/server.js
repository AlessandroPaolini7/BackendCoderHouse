const express = require('express');
const app = express();
const PORT = 8080;
const Contenedor = require('./main.js');
const products = new Contenedor('products.txt');

app.use(express.static('public'));

const router = express.Router();

app.use('/api/productos', router);

//GET/api/products
router.get('/', async (req, res) => {
    const array = await products.getAll();
    if(array.length > 0){
        res.send(array);
    }else{
        res.status(404).send('No hay productos');
    }
})

//GET/api/products/:id
router.get('/:id', async (req, res) => {
    const id = Number(req.params.id);
    const product = await products.getById(id);
    if(product != undefined){
        res.send(product);
    }else{
        res.status(404).send('No se encontró el producto');
    }
})

//POST/api/products
router.post('/', async (req,res) => {
    const {body} = req;
    const newProductId = await products.save(body);
    res.status(200).send(`Producto agregado con el ID: ${newProductId}`);
});


//PUT/api/products/:id
router.put('/:id', async (req, res) => {
    const id = Number(req.params.id);
    const newData = req.body;
    const product = await products.updateById(id, newData);
    if(product != undefined){
        res.status(200).send(`El producto con ID: ${id} fue actualizado`);
    }else{
        res.status(404).send('No se encontró el producto');
    }
});

//DELETE/api/products/:id
router.delete('/:id', async (req, res) => {
    const id = Number(req.params.id);
    const product = await products.deleteById(id);
    if(product != undefined){
        res.status(200).send(`El producto con ID: ${id} fue eliminado`);
    }else{
        res.status(404).send('No se encontró el producto');
    }
});

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});