const express = require('express');
const fs = require("fs");

const carrito = express.Router();

carrito.use(express.json());
carrito.use(express.urlencoded({extended: true}));

let listaCarrito = [];
let contadorCarrito = 1;

let listaProductos = []

carrito.post('', async (req,res) => {
    try {
        listaCarrito.push(
            {
                id: contadorCarrito,
                timestamp: Date.now(),
                productos: []
            }
        )
        //console.log();
        res.json({'Carrito agregado': {
                'id': contadorCarrito
            }
        });
        await fs.promises.writeFile(`./carrito.txt`, JSON.stringify(listaCarrito,null,2));
        contadorCarrito = listaCarrito[listaCarrito.length - 1].id + 1;
    } catch (error) {
        console.log(error, "Hubo un error");
    }
})

carrito.delete('/:id', async (req,res) => {
    try {
        let carritoBuscado = listaCarrito.find(carr => carr.id == req.params.id);

        if(carritoBuscado === undefined){
            res.json({error: `Carrito ${req.params.id} no encontrado`})
        }

        listaCarrito = listaCarrito.filter(carr => carr.id != req.params.id);
        
        if(listaCarrito.length === 0){
            res.json({'msg': 'Todos los carritos han sido eliminados'})
        }
        await fs.promises.writeFile(`./carrito.txt`, JSON.stringify(listaCarrito,null,2));
        res.json(`Carrito ${req.params.id} eliminado`)
    } catch (error) {
        console.log(error, "Hubo un error");
    }
})

carrito.get('/:id/productos', (req,res) => {
    if (listaCarrito.length === 0){
        res.json({'msg': 'No hay carritos agregados'})
    }else{
        if(req.params.id === undefined){
            res.send(listaCarrito)
        }else{
            let carritoBuscado = listaCarrito.find(carr => carr.id == req.params.id);
            if(carritoBuscado === undefined){
                res.json({error: `Carrito ${req.params.id} no encontrado`})
            }
            res.json(carritoBuscado.productos);
        } 
    }
})

carrito.post('/:id/productos/:id_prod', async (req,res) => {
    try {
        let carritoBuscado = listaCarrito.find(carr => carr.id == req.params.id);

        if(carritoBuscado === undefined){
            res.json({error: `Carrito ${req.params.id} no encontrado`})
        }

        let productoBuscado = listaProductos.find(prod => prod.id == req.params.id_prod);

        if(productoBuscado === undefined){
            res.json({error: `Producto ${req.params.id} no encontrado`})
        }

        listaCarrito = listaCarrito.filter(carr => carr.id != req.params.id);

        carritoBuscado.productos = [...carritoBuscado.productos, productoBuscado];

        listaCarrito.push(carritoBuscado)

        await fs.promises.writeFile(`./carrito.txt`, JSON.stringify(listaCarrito,null,2));
        res.json(carritoBuscado)
    } catch (error) {
        console.log(error, "Hubo un error");
    }
})

carrito.delete('/:id/productos/:id_prod', async (req,res) => {
    try {
        let carritoBuscado = listaCarrito.find(carr => carr.id == req.params.id);

        if(carritoBuscado === undefined){
            res.json({error: `Carrito ${req.params.id} no encontrado`})
        }

        let productosCarrito = carritoBuscado.productos;

        let productosModificados = productosCarrito.filter(prod => prod.id != req.params.id_prod);

        listaCarrito = listaCarrito.filter(carr => carr.id != req.params.id);

        carritoBuscado.productos = productosModificados;

        listaCarrito.push(carritoBuscado)

        await fs.promises.writeFile(`./carrito.txt`, JSON.stringify(listaCarrito,null,2));
        res.json(carritoBuscado)
    } catch (error) {
        console.log(error, "Hubo un error");
    }
})


module.exports = carrito ;