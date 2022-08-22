const express = require('express');
const PORT = 8080;
const Contenedor = require('./main.js');
const {Router} = express;


const productosApi = new Contenedor('products.txt');

const productosRouter = new Router();

productosRouter.use(express.json());
productosRouter.use(express.urlencoded({extended: true}));

//GET/api/products
productosRouter.get('/', async (req, res) => {
    const array = await productosApi.getAll();
    if(array.length > 0){
        res.send(array);
    }else{
        res.status(404).send('No hay productos');
    }
});

//GET/api/products/:id
productosRouter.get('/:id', async (req, res) => {
    const id = Number(req.params.id);
    const product = await productosApi.getById(id);
    if(product != undefined){
        res.send(product);
    }else{
        res.status(404).send('No se encontró el producto');
    }
});

//POST/api/products
productosRouter.post('/', async (req,res) => {
    const newData = {"title": req.body.title, "price": req.body.price, "thumbnail": req.body.thumbnail};
    const newProductId = await productosApi.save(newData);
    res.status(200).send(`Producto agregado exitosamente con ID: ${newProductId}`);
});

//PUT/api/products/:id
productosRouter.put('/:id', async (req, res) => {
    const id = Number(req.params.id);
    const newData = req.body;
    const product = await productosApi.updateById(id, newData);
    if(product != undefined){
        res.status(200).send(`El producto con ID: ${id} fue actualizado`);
    }else{
        res.status(404).send('No se encontró el producto');
    }
});

//DELETE/api/products/:id
productosRouter.delete('/:id', async (req, res) => {
    const id = Number(req.params.id);
    const product = await productosApi.deleteById(id);
    if(product != undefined){
        res.status(200).send(`El producto con ID: ${id} fue eliminado`);
    }else{
        res.status(404).send('No se encontró el producto');
    }
});


const app = express();

app.use(express.static('public'));

app.use('/api/productos', productosRouter);

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${server.address().port}`);
})