const router = require('express').Router();

let productos = [];

router.get('/productos', (req, res) => {
    res.render('form');
})

router.get('/listaproductos', (req, res) => {
    res.render('productos', {productos});
});

router.post('/productos', (req, res) => {
    const {title, price, thumbnail} = req.body;
    productos.push({title, price, thumbnail});
    res.render('form');
} );

module.exports = router;