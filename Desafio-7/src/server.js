const express = require('express');
const app = express();
const Contenedor = require('./main.js');
const contenedor = new Contenedor("productos.json", ["timestamp", "title", "price", "description", "code", "image", "stock"]);
const carrito = new Contenedor("carrito.json", ["timestamp", "products"]);

const dotenv = require('dotenv');
dotenv.config();
console.log(process.env.PORT);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const authMiddleware = app.use((req, res, next) => {
    req.header('Authorization') === process.env.TOKEN
        ? next()
        : res.status(401).json({ error: 'No autorizado' });
});

const routerProducts = express.Router();
const routerCart = express.Router();

app.use('/api/productos', routerProducts);
app.use('/api/carrito', routerCart);

/* ------------------------ Product Endpoints ------------------------ */

// GET api/productos
routerProducts.get('/', async (req, res) => {
    const products = await contenedor.getAll();
    res.status(200).json(products);
})

// GET api/productos/:id
routerProducts.get('/:id', async (req, res) => {
    const { id } = req.params;
    const product = await contenedor.getById(id);
    
    product ? res.status(200).json(product) : res.status(400).json({"error": "product not found"})
})

// POST api/productos
routerProducts.post('/',authMiddleware, async (req,res, next) => {
    const {body} = req;
    body.timestamp = Date.now().toLocaleString();
    
    const newProductId = await contenedor.save(body);
    
    newProductId ? res.status(200).json({"success" : "product added with ID: "+newProductId}) : res.status(400).json({"error": "invalid key. Please verify the body content"})
})

// PUT api/productos/:id
routerProducts.put('/:id', authMiddleware ,async (req, res, next) => {
    const {id} = req.params;
    console.log(id);
    const {body} = req;
    const wasUpdated = await contenedor.updateById(id,body);
    
    wasUpdated ? res.status(200).json({"success" : "product updated"}) : res.status(404).json({"error": "product not found"})
})


// DELETE /api/productos/:id
routerProducts.delete('/:id', authMiddleware, async (req, res, next) => {
    const {id} = req.params;
    const wasDeleted = await contenedor.deleteById(id);
    
    wasDeleted ? res.status(200).json({"success": "product successfully removed"}) : res.status(404).json({"error": "product not found"})
})


/* ------------------------ Cart Endpoints ------------------------ */

//POST /api/carrito
routerCart.post('/', async (req, res) => {
    const {body} = req;
    body.timestamp = Date.now().toLocaleString();
    const newCartId = await carrito.save(body);
    
    newCartId ? res.status(200).json({"success" : "cart added with ID: "+newCartId}) : res.status(400).json({"error": "invalid key. Please verify the body content"})
})


//DELETE /api/carrito/:id
routerCart.delete('/:id', async (req, res) => {
    const {id} = req.params;
    const wasDeleted = await carrito.deleteById(id);
    
    wasDeleted ? res.status(200).json({"success": "cart successfully removed"}) : res.status(404).json({"error": "cart not found"})
})


//POST /api/carrito/:id/productos
routerCart.post('/:id/productos', async(req,res) => {
    const {id} = req.params;
    const { body } = req;
    
    const product = await contenedor.getById(body['id']);    
    
    if (product) {
        console.log(product);
        const cartExist = await carrito.addToArrayById(id, {"products": product});
        cartExist
            ? res.status(200).json({"success" : "product added"})
            : res.status(404).json({"error": "cart not found"})
    } else {
        res.status(404).json({"error": "product not found, verify the ID in the body content is correct."})
    }
})


//DELETE /api/carrito/:id/productos/:id
routerCart.delete('/:id/productos/:id', async (req, res) => {
    const {id, idProduct} = req.params;
    const productExists = await contenedor.getById(idProduct);
    if(productExists){
        const cartExists = await carrito.deleteFromArrayById(id, {"products": productExists});
        cartExists ? res.status(200).json({"success": "product removed from cart"}) : res.status(404).json({"error": "cart not found"})
    }else{
        res.status(404).json({"error": "product not found"})
    }
})


//GET /api/carrito/:id
routerCart.get('/:id', async (req, res) => {
    const {id} = req.params;
    const cart = await carrito.getById(id);  
    cart ? res.status(200).json(cart) : res.status(404).json({"error": "cart not found"})
})

const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});


