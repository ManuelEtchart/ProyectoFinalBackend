import ContenedorArchivos from "../contenedores/contenedorArchivos.js";

class CarritoDaoArchivos extends ContenedorArchivos{
    constructor(){
        super('carrito.txt')
    }
}

export default CarritoDaoArchivos;