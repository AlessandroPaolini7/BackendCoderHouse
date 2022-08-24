const router = require('express').Router();
const Contenedor = require('../main.js');
const contenedor = new Contenedor('./products.txt');


router.get('/productos', (req, res) => {
    res.render('form');
})

router.get('/listaproductos', async (req, res) => {
    const productos = await contenedor.getAll();
    res.render('productos', {productos});
});

router.post('/productos', async (req, res) => {
    const {body} = req;
    await contenedor.save(body);
    res.redirect('/');
} );

router.get('/', (req,res) => {
    res.render('form', {})
})

module.exports = router;