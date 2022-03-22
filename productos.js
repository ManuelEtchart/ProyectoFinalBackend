import express from 'express';
//import decision from './src/DAOs/decision.js';
import ProductosDaoMemoria from './src/DAOs/productosDaoMemoria.js';
import ProductosDaoArchivos from './src/DAOs/productosDaoArchivos.js';
import ProductosDaoMongoDB from './src/DAOs/productosDaoMongoDB.js';
import ProductosDaoFB from './src/DAOs/productosDaoFB.js';

//const query = await decision()
//const queryProducto = query.queryProducto

const productos = express.Router();

export const productoMemoria = new ProductosDaoMemoria()
export const productoArchivos = new ProductosDaoArchivos()
export const productoMonDB = new ProductosDaoMongoDB();
export const productoFB = new ProductosDaoFB()

productos.use(express.json());
productos.use(express.urlencoded({extended: true}));

const administrador = true;

productos.get('/:id?', async (req,res) => {
    try {
        if (req.params.id === undefined) {
            res.json(await productoFB.getAll())
        }
        res.json(await productoFB.getById(req.params.id))
    } catch (error) {
        console.log(error, "Hubo un error");
    }
})

productos.post('', async (req,res) => {
    try{
        if(administrador){
            
            res.json(await productoFB.save({
                timestamp: Date.now(),
                nombre: req.query.nombre,
                descripcion: req.query.descripcion,
                codigo: req.query.codigo,
                foto: req.query.foto,
                precio: req.query.precio,
                stock: req.query.stock
            }));
            
        }else{
            res.send({error: '-1', descripcion: `ruta ${req.url} metodo ${req.method} no autorizada`});
        }
    }catch(error){
        console.log(error, "Hubo un error");
    }
});

productos.put('/:id', async (req,res) => {
    try {
        if(administrador){
            res.json(await productoFB.updateById(req.params.id, req.query));
        }else{
            res.send({error: '-1', descripcion: `ruta ${req.url} metodo ${req.method} no autorizada`});
        }
    } catch (error) {
        console.log(error, "Hubo un error");
    }
})

productos.delete('/:id', async (req,res) => {
    try {
        if(administrador){
            res.json(await productoFB.deleteById(req.params.id))
        }else{
            res.send({error: '-1', descripcion: `ruta ${req.url} metodo ${req.method} no autorizada`});
        }
    } catch (error) {
        console.log(error, "Hubo un error");
    }
    
})

export default productos;
