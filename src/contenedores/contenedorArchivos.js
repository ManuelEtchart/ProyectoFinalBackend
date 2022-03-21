import fs from 'fs';
import { queryProductos } from '../../productos.js';

class ContenedorArchivos{
    nombreArchivo;

    constructor(nombreArchivo){
        this.nombreArchivo = nombreArchivo;
    };

    async save(obj){
        try {
            let contenido = await fs.promises.readFile(`./${this.nombreArchivo}`, "utf-8");

            switch (contenido) {
                case "":
                    let contador = 1;
                    obj.id = contador;
                    let producto = JSON.stringify([obj],null,2);
                    await fs.promises.writeFile(`./${this.nombreArchivo}`, producto);
                    return {'msg':`Se agrego a ${this.nombreArchivo} un objeto con id: ${contador}`};

                case "[]":   
                    let contador2 = 1;
                    obj.id = contador2;
                    let producto2 = JSON.stringify([obj],null,2);
                    await fs.promises.writeFile(`./${this.nombreArchivo}`, producto2);
                    return {'msg':`Se agrego a ${this.nombreArchivo} un objeto con id: ${contador2}`};

                default:
                    let array = JSON.parse(contenido);
                    let contador3 = array[array.length - 1].id;
                    contador3 += 1;
                    obj.id = contador3;
                    array.push(obj);
                    await fs.promises.writeFile(`./${this.nombreArchivo}`, JSON.stringify(array,null,2));
                    return {'msg':`Se agrego a ${this.nombreArchivo} un objeto con id: ${contador3}`}
                    
            }
        } catch (error) {
            console.log(error, "Hubo un error");
        }
    };

    async getById(id){
        try {
            let contenido = await fs.promises.readFile(`./${this.nombreArchivo}`, "utf-8");
            let array = JSON.parse(contenido);
            let objElegido = array.find(obj => obj.id == id)
            return objElegido;
        } catch (error) {
            console.log(error, "Hubo un error");
        };
    };

    async getAll(){
        try {
            let contenido = await fs.promises.readFile(`./${this.nombreArchivo}`, "utf-8");
            return JSON.parse(contenido);
        } catch (error) {
            console.log(error, "Hubo un error");
        };
    };

    async updateById(id,cambios){
        try {
            let contenido = await fs.promises.readFile(`./${this.nombreArchivo}`, "utf-8");
            let array = JSON.parse(contenido);
            let objElegido = array.find(obj => obj.id == id);

            objElegido = cambios;

            cambios.fecha = Date.now()
            cambios.id = id

            array = array.filter(prod => prod.id != id);

            array.push(objElegido);
            await fs.promises.writeFile(`./${this.nombreArchivo}`, JSON.stringify(array,null,2))
            return objElegido
        } catch (error) {
            console.log(error, "Hubo un error");
        }
    }

    async deleteById(id){
        try {
            let contenido = await fs.promises.readFile(`./${this.nombreArchivo}`, "utf-8");
            let array = JSON.parse(contenido);
            let nuevoArray = array.filter(obj => obj.id != id);
            await fs.promises.writeFile(`./${this.nombreArchivo}`, JSON.stringify(nuevoArray,null,2));
            return {'msg':`Se elimino el objeto con id: ${id}`};
        } catch (error) {
            console.log(error, "Hubo un error");
        };
    };

    
    async deleteAll(){
        try {
            await fs.promises.writeFile(`./${this.nombreArchivo}`, "[]");
            return {'msg':`Se elimino todo el contenido de ${this.nombreArchivo}`};
        } catch (error) {
            console.log(error, "Hubo un error");
        };
    };

    async agregarProductoEnCarrito(id, id_prod){
        try {
            let contenido = await fs.promises.readFile(`./${this.nombreArchivo}`, "utf-8");
            let array = JSON.parse(contenido);
            let carritoBuscado = array.find(obj => obj.id == id)

            let productoBuscado = await queryProductos.getById(id_prod)

            carritoBuscado.productos = [...carritoBuscado.productos, productoBuscado];

            let nuevoArray = array.filter(carr => carr.id != id);

            nuevoArray.push(carritoBuscado)

            await fs.promises.writeFile(`./${this.nombreArchivo}`, JSON.stringify(nuevoArray,null,2));

            return carritoBuscado
        } catch (error) {
            console.log(error, "Hubo un error");
        }
    }

    async borrarProductoEnCarrito(id, id_prod){
        try {
            let contenido = await fs.promises.readFile(`./${this.nombreArchivo}`, "utf-8");
            let array = JSON.parse(contenido);
            let carritoBuscado = array.find(obj => obj.id == id)

            let productosCarrito = carritoBuscado.productos;

            let productosModificados = productosCarrito.filter(prod => prod.id != id_prod);

            let nuevoArray = array.filter(carr => carr.id != id);

            carritoBuscado.productos = productosModificados;

            nuevoArray.push(carritoBuscado)

            await fs.promises.writeFile(`./${this.nombreArchivo}`, JSON.stringify(nuevoArray,null,2));

            return carritoBuscado
        } catch (error) {
            console.log(error, "Hubo un error");
        }
    }
};


export default ContenedorArchivos;