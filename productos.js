import express from 'express';
import decision from './src/DAOs/decision.js';
const productos = express.Router();

//export const productoMonDB = new ProductosDaoMongoDB();
const query = await decision()

//export const productoArchivos = new ProductosDaoArchivos()
export const queryProductos = query.queryProductos

productos.use(express.json());
productos.use(express.urlencoded({extended: true}));

const administrador = true;

productos.get('/:id?', async (req,res) => {
    try {
        if (req.params.id === undefined) {
            res.json(await queryProductos.getAll())
        }
        res.json(await queryProductos.getById(req.params.id))
    } catch (error) {
        console.log(error, "Hubo un error");
    }
})

productos.post('', async (req,res) => {
    try{
        if(administrador){
            
            res.json(await queryProductos.save({
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
            res.json(await queryProductos.updateById(req.params.id, req.query));
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
            res.json(await queryProductos.deleteById(req.params.id))
        }else{
            res.send({error: '-1', descripcion: `ruta ${req.url} metodo ${req.method} no autorizada`});
        }
    } catch (error) {
        console.log(error, "Hubo un error");
    }
    
})

export default productos;
