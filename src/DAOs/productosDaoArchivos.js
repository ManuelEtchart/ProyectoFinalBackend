import ContenedorArchivos from "../contenedores/contenedorArchivos.js";

class ProductosDaoArchivos extends ContenedorArchivos{
    constructor(){
        super('productos.txt')
    }
}

export default ProductosDaoArchivos;