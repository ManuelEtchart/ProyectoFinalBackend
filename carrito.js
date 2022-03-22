import express from 'express';
//import decision from './src/DAOs/decision.js';
import CarritoDaoMemoria from './src/DAOs/carritoDaoMemoria.js';
import CarritoDaoArchivos from './src/DAOs/carritoDaoArchivos.js';
import CarritoDaoMongoDB from './src/DAOs/carritoDaoMongoDB.js';
import CarritoDaoFB from './src/DAOs/carritoDaoFB.js';
const carrito = express.Router();

//const query = await decision()
//const queryCarrito = query.queryCarrito


const carritoMemoria = new CarritoDaoMemoria()
const carritoArchivos = new CarritoDaoArchivos()
const carritoMonDB = new CarritoDaoMongoDB()
const carritoFB = new CarritoDaoFB()

carrito.use(express.json());
carrito.use(express.urlencoded({extended: true}))

carrito.post('', async (req,res) => {
    try {
        res.json(await carritoFB.save(
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
        res.json(await carritoFB.deleteById(req.params.id))
    } catch (error) {
        console.log(error, "Hubo un error");
    }
})

carrito.get('/:id?/productos', async (req,res) => {
    if(req.params.id === undefined){
        res.send(await carritoFB.getAll())
    }
    res.json(await carritoFB.getById(req.params.id))
})

carrito.post('/:id/productos/:id_prod', async (req,res) => {
    try {
        res.json(await carritoFB.agregarProductoEnCarrito(req.params.id, req.params.id_prod))
    } catch (error) {
        console.log(error, "Hubo un error");
    }
})

carrito.delete('/:id/productos/:id_prod', async (req,res) => {
    try {
        res.json( await carritoFB.borrarProductoEnCarrito(req.params.id,req.params.id_prod))
    } catch (error) {
        console.log(error, "Hubo un error");
    }
})


export default carrito;