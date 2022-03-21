import express from 'express';
import decision from './src/DAOs/decision.js';

const carrito = express.Router();

const query = await decision()
const queryCarrito = query.queryCarrito

//const carritoMonDB = new CarritoDaoMongoDB()
//const carritoMemoria = new CarritoDaoMemoria()
//const carritoArchivos = new CarritoDaoArchivos()

carrito.use(express.json());
carrito.use(express.urlencoded({extended: true}));

carrito.post('', async (req,res) => {
    try {
        res.json(await queryCarrito.save(
            {
                timestamp: Date.now(),
                productos: []
            }
        ));
    } catch (error) {
        console.log(error, "Hubo un error");
    }
})

carrito.delete('/:id', async (req,res) => {
    try {
        res.json(await queryCarrito.deleteById(req.params.id))
    } catch (error) {
        console.log(error, "Hubo un error");
    }
})

carrito.get('/:id?/productos', async (req,res) => {
    if(req.params.id === undefined){
        res.send(await queryCarrito.getAll())
    }
    res.json(await queryCarrito.getById(req.params.id))
})

carrito.post('/:id/productos/:id_prod', async (req,res) => {
    try {
        res.json(await queryCarrito.agregarProductoEnCarrito(req.params.id, req.params.id_prod))
    } catch (error) {
        console.log(error, "Hubo un error");
    }
})

carrito.delete('/:id/productos/:id_prod', async (req,res) => {
    try {
        res.json( await queryCarrito.borrarProductoEnCarrito(req.params.id,req.params.id_prod))
    } catch (error) {
        console.log(error, "Hubo un error");
    }
})


export default carrito;