import config from "../utils/config.js";
import admin from "firebase-admin";
import firebase from "firebase-admin";
import { productoFB } from "../../productos.js";
//import serviceAccount from '../DB/proyectofinalbackend-firebase-adminsdk-mlepy-5afa60846d.json';

const serviceAccount = {
    "type": "service_account",
    "project_id": "proyectofinalbackend",
    "private_key_id": "5afa60846d6edfab8b071cf787100d48dc086729",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC/MvLCyXso8bOq\nGyzQqbRpNTAUdbssgvWNuUOPMix/ZrmxRNe/Blu+AxjXBEvPAo87j4qr+aV7XO3U\n8YhIi8H8MqXCMI3/sRHsH/D71/oFSvr7+wxLK5ID6El0hDuSq/uM0vQs885R3w/j\naZpVcCRy6EuCvbJsiEnn6RYt+IWH69YEKqWh6NfY8Yr3K+phZ5vqj4M0bbj+eHId\nkFFCdbipBIOmlwVBqUMOqxZoOAB+hiyDJbvYVqTNoIrH5JnnINXuwDr107oX0LwJ\n/oLX0uCOL/IfzqdQy6nSK+ARY4KbMYWMJjUAylWfxx9Die4weoN0tDWT1hiWP+7Y\ndmOuBS8vAgMBAAECggEANy+ZaieFaNf6p4qYcNHKxOMZMY6Zq8tQ3MsweNBej5cy\n2bupGfXX3Qw/yy/uQZ3XgbV4rRKtdOHps6DTWT0djJGBzn79PWP6bFD72XUJMSXn\nM3vOnJPC3WXabcsM9tS1EnyBBciJMJBVoaoFZcuseY4a3W2rZjAgRNO+Fx64S/aC\nAGpkdRgUGavDu5ZWzFrbw85s/br5xFarzoMKL6IX47KHiT7o+ML1LrU/eHke50K7\nHw67ocAGwZ6RgS3H134ARHZ5RyEFMgmg6cpDQW2ghnHl1zKskDgwo4KiT6ltbghn\nyC2CKYnIV0DjZsoKumbW0mbPLDAtCO0Nl/LpRYAH4QKBgQDvNy3XoYanu3RQeB0r\nCHsEYjeg8zIFc7I+9WjVKHqD2iVSUi+WShUZQnjU6C4+73HYC7y3kKrTgxOYYxgn\n6I7NbtaeSakAMig4YPEELCPWmDzDgHyoknna5J5z+asfh1qR35dFb73mNal5FPIe\n1Dpt2zxZMGcbQAyegiiuTZpWrQKBgQDMnUpCO/pXt7gNoMFNrvmVHVhAgAd4AP9B\nUu+OCa7iOrpyL3OVaB/bY5OPNp/S/CMvQIwdA0AVelVBN2PKUvDFZOqrzvGqGkrg\nZl7l9m5Sf9nKFJ8xiUILLubvcelBW/m8SXm82xrPN8Em+Kfr4gxshaIQbMDgvTB2\n+axfWh7EywKBgF1DZxUNvaEBfYyt97lCWivQWx3eEx97BwByz4dje7iSQUDCGBmB\nEo7Bkrh3OSiCVCFGGjJ7LY6/KNGduNo+WgaP8w7Nax1PcMziRrU4vFQ7EF2sZ22V\nhfqobXqL2YK2U8JRqPmCYkgxnbw+RVNtrMYN1o5zR4+hPgpCdrfWO5kVAoGAC54O\nnk4be6mBuLxc3VVG9HFzFk5uniCoXYQg99aS6GNfPKZ3EI+V53Xy5dm7H1aThNZM\nXkVV+SI1/vrvHoixBPQi4thgHkFZ6P3G+5WPU/3QVsnu8/gQGORz1jqIfN6FAmzF\njbR/BC7tN5I8robqH6tCtV4HYXs8ajTo1Y0fXBsCgYEAtKi3QuQfjfZ8eFy+EZKJ\nBmR1rVddQm8axtlZEfZWURGyUmbYOgaJavv+hvWA26LSRylHflxP0wkHccJkExa9\nx+ilNjm1t/M88vphSJvaGlXWHNh8FJ9R7+n0mhYf0pOoDc0OsvhgCQIOR+YB5VkA\noBdsw+qKTDqycAFu1YCkSlo=\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-mlepy@proyectofinalbackend.iam.gserviceaccount.com",
    "client_id": "103902997254794649803",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-mlepy%40proyectofinalbackend.iam.gserviceaccount.com"
  }

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