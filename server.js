import express from 'express';

const app = express();

app.use(express.static('public'));

import productos from './productos.js';
import carrito from './carrito.js';


app.use('/api/carrito', carrito);
app.use('/api/productos', productos);

app.get('*', (req,res) => {
    res.send({error: '-2', descripcion: `ruta ${req.url} metodo ${req.method} no implementada`});
})
app.post('*', (req,res) => {
    res.send({error: '-2', descripcion: `ruta ${req.url} metodo ${req.method} no implementada`});
})
app.delete('*', (req,res) => {
    res.send({error: '-2', descripcion: `ruta ${req.url} metodo ${req.method} no implementada`});
})
app.put('*', (req,res) => {
    res.send({error: '-2', descripcion: `ruta ${req.url} metodo ${req.method} no implementada`});
})

const PORT = 8080;

const server = app.listen(PORT, () => {
   console.log(`Servidor escuchando en el puerto ${server.address().port}`);
});

server.on("error", error => console.log(`Error en servidor ${error}`));