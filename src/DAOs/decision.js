


// decidir entre memoria, archivos, MongoDB, Firebase


async function decision(){
    const query = 'MongoDB'
    try{
        if (query === 'memoria') {
            const ProductosDaoMemoria = (await import('./productosDaoMemoria.js')).default
            
            const CarritoDaoMemoria = (await import('./carritoDaoMemoria.js')).default

            const queryProductos = new ProductosDaoMemoria()
            const queryCarrito = new CarritoDaoMemoria()

            return {queryProductos: queryProductos, queryCarrito: queryCarrito}
        
        } else if(query === 'archivos'){
            const ProductosDaoArchivos = (await import("./productosDaoArchivos.js")).default
        
            const CarritoDaoArchivos = (await import("./carritoDaoArchivos.js")).default
            
            const queryProductos = new ProductosDaoArchivos()
            const queryCarrito = new CarritoDaoArchivos()
            return {queryProductos: queryProductos, queryCarrito: queryCarrito}
            
        }else if(query === 'MongoDB'){
            const ProductosDaoMongoDB = (await import("./productosDaoMongoDB.js")).default
            
            const CarritoDaoMongoDB = (await import("./carritoDaoMongoDB.js")).default

            const queryProductos = new ProductosDaoMongoDB()
            const queryCarrito = new CarritoDaoMongoDB()
            return {queryProductos: queryProductos, queryCarrito: queryCarrito}
            
        }else if(query === 'Firebase'){

                //const queryProductos
                //const queryCarrito
        }
    }catch(error){
        console.log(error, "Hubo un error");
    }
}


export default decision;