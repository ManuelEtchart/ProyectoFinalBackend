import config from "../utils/config.js";
import admin from "firebase-admin";
import firebase from "firebase-admin";
import { productoFB } from "../../productos.js";
//import serviceAccount from '../DB/proyectofinalbackend-firebase-adminsdk-mlepy-5afa60846d.json';

//const serviceAccount = '',

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();


class ContenedorFirebase {
    constructor(nombreColeccion){
        this.coleccion = db.collection(nombreColeccion)
    }

    async save(obj){
        try {
            await this.coleccion.add(obj)
            return {'producto': obj,'msg': `Objeto Agregado`}
        } catch (error) {
            console.log(error, "Hubo un error");
        }
    }

    async getById(id){
        try {
            const item = await this.coleccion.doc(`${id}`).get()
            const response = {datos: item.data(),id: item.id }
            return response
        } catch (error) {
            console.log(error, "Hubo un error");
        }
    }

    async getAll(){
        try {
            const snapshot = await this.coleccion.get()
            let docs = snapshot.docs

            const response = docs.map((doc)=>({
                id: doc.id,
                timestamp: doc.data().timestamp,
                nombre: doc.data().nombre,
                descripcion: doc.data().descripcion,
                codigo: doc.data().codigo,
                foto: doc.data().foto,
                precio: doc.data().precio,
                stock: doc.data().stock,
                productos: doc.data().productos
            }))
            return response
        } catch (error) {
            console.log(error, "Hubo un error");
        }
    }

    async updateById(id, cambios){
        try {
            await this.coleccion.doc(`${id}`).update(cambios)
            return {'msg': 'Producto Modificado'}
        } catch (error) {
            console.log(error, "Hubo un error");
        }
    }

    async deleteById(id){
        try {
            await this.coleccion.doc(`${id}`).delete()
            return {'msg': 'Objeto eliminado'}
        } catch (error) {
            console.log(error, "Hubo un error");
        }
    }

    async agregarProductoEnCarrito(id, id_prod){
        try {
            const productoBuscado = await productoFB.getById(id_prod)

            await this.coleccion.doc(`${id}`).update({productos: firebase.firestore.FieldValue.arrayUnion(productoBuscado)})
            
            return {'msg': 'Carrito modificado'}
        } catch (error) {
            console.log(error, "Hubo un error");
        }
    }

    async borrarProductoEnCarrito(id, id_prod){
        try {
            const productoBuscado = await productoFB.getById(id_prod)
            await this.coleccion.doc(`${id}`).update({productos: firebase.firestore.FieldValue.arrayRemove(productoBuscado)})

            return {'msg': 'Carrito modificado'}
        } catch (error) {
            console.log(error, "Hubo un error");
        }
    }
}

export default ContenedorFirebase;