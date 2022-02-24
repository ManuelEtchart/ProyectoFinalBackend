const express = require('express');
const fs = require("fs");

const productos = express.Router();

productos.use(express.json());
productos.use(express.urlencoded({extended: true}));

let listaProductos = [];
let contadorProductos = 1;

const administrador = true;

productos.get('/:id?', (req,res) => {
    if (listaProductos.length === 0){
        res.json({'msg': 'No hay productos agregados'})
    }else{
        if(req.params.id === undefined){
            res.send(listaProductos)
        }else{
            let productoBuscado = listaProductos.find(prod => prod.id == req.params.id);
            if(productoBuscado === undefined){
                res.json({error: `Producto ${req.params.id} no encontrado`})
            }
            res.json(productoBuscado);
        } 
    }
})

productos.post('', async (req,res) => {
    try{
        if(administrador){
            listaProductos.push(
                {
                    id: contadorProductos,
                    timestamp: Date.now(),
                    nombre: req.query.nombre,
                    descripcion: req.query.descripcion,
                    codigo: req.query.codigo,
                    foto: req.query.foto,
                    precio: req.query.precio,
                    stock: req.query.stock
                }
            )
            res.json({'Producto agregado': {
                    'id': contadorProductos,
                    'timestamp': Date.now(),
                    'nombre': req.query.nombre,
                    'descripcion': req.query.descripcion,
                    'codigo': req.query.codigo,
                    'foto': req.query.foto,
                    'precio': req.query.precio,
                    'stock': req.query.stock
                }
            });
            await fs.promises.writeFile(`./productos.txt`, JSON.stringify(listaProductos,null,2));
            contadorProductos = listaProductos[listaProductos.length - 1].id + 1;
        }else{
            res.send({error: '-1', descripcion: `ruta ${req.url} metodo ${req.method} no autorizada`});
        }
    }catch(error){
        console.log(error, "Hubo un error");
    }
})

productos.put('/:id', async (req,res) => {
    try {
        if(administrador){
            let productoBuscado = listaProductos.find(prod => prod.id == req.params.id);

            if(productoBuscado === undefined){
                res.json({error: `Producto ${req.params.id} no encontrado`})
            }

            productoBuscado = {
                id: req.params.id,
                nombre: req.query.nombre,
                descripcion: req.query.descripcion,
                codigo: req.query.codigo,
                foto: req.query.foto,
                precio: req.query.precio,
                stock: req.query.stock
            };

            listaProductos = listaProductos.filter(prod => prod.id != req.params.id);

            listaProductos.push(productoBuscado);

            await fs.promises.writeFile(`./productos.txt`, JSON.stringify(listaProductos,null,2));
            res.json({msg: `Producto ${req.params.id} modificado`});
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
            let productoBuscado = listaProductos.find(prod => prod.id == req.params.id);

            if(productoBuscado === undefined){
                res.json({error: `Producto ${req.params.id} no encontrado`})
            }

            listaProductos = listaProductos.filter(prod => prod.id != req.params.id);
            
            if(listaProductos.length === 0){
                res.json({'msg': 'Todos los productos han sido eliminados'})
            }
            await fs.promises.writeFile(`./productos.txt`, JSON.stringify(listaProductos,null,2));
            res.json(`Producto ${req.params.id} eliminado`)
        }else{
            res.send({error: '-1', descripcion: `ruta ${req.url} metodo ${req.method} no autorizada`});
        }
    } catch (error) {
        console.log(error, "Hubo un error");
    }
    
})

module.exports = productos;

