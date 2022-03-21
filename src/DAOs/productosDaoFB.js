import ContenedorFirebase from "../contenedores/contenedorFirebase.js";

class ProductosDaoFB extends ContenedorFirebase{
    constructor(){
        super('productos')
    }
}

export default ProductosDaoFB; 