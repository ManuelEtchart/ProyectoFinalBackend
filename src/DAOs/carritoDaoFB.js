import ContenedorFirebase from "../contenedores/contenedorFirebase.js";

class CarritoDaoFB extends ContenedorFirebase{
    constructor(){
        super('carritos')
    }
}

export default CarritoDaoFB; 