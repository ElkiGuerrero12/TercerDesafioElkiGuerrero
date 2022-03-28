const fs = require('fs');


class Contenedor {
    constructor(nombreArchivo){
        this.archivo = nombreArchivo
    }

    async leerData(){
        //leer archivo
        const data = await fs.promises.readFile(this.archivo, 'utf-8');//data = []
        return JSON.parse(data);         
    }

    async escribirData(data){
        await fs.promises.writeFile(
            this.archivo,
            JSON.stringify(data, null, '\t')
        );

    }

    async save(miObjeto){
        const productos = await this.leerData();
        let id;
        //al primer elemnto del array le coloco id 1
        if (productos.length === 0) id = 1;
                    //último producto del array, al id le sumo 1       
        else id = productos[productos.length - 1].id +1;

        //creo el objeto
        const productoNuevo = {
            id: id,
            nombre: miObjeto.nombre,
            precio: miObjeto.precio,
        };

        productos.push(productoNuevo);

        await this.escribirData(productos);
    }

    async getById(number){
        const productos = await this.leerData();

         const indice = productos.findIndex((unProducto) =>{
             if (unProducto.id === number ) return true;
             else return false;
         });

         if (indice === -1) return null;

         return productos[indice]
    }

    async getAll(){
        const productos = await this.leerData();
        return productos;
    }

    async deleteById(number){
        const productos = await this.leerData();
        
        const nuevoArray = productos.filter((unProducto) => unProducto.id != number
        );

        await this.escribirData(nuevoArray);

    }

    async deleteAll(){
        const nuevo = []

        await this.escribirData(nuevo);


    }
}

const miContenedor = new Contenedor('productos.json')

module.exports = {
    Contenedor: miContenedor,
}

const prueba = {
    nombre: 'Regla',
    precio:100,
}

//miContenedor.save(prueba)

/*miContenedor.getById(2).then((data) =>{
    console.log(data)
})*/

/*miContenedor.getAll().then((data) =>{
    console.log(data)
})
.catch((err) =>{
    console.log(err)
})*/

/*miContenedor.deleteById(1).then((data) =>{
    //console.log(data)
})
.catch((err) =>{
    console.log(err)
})*/

/*miContenedor.deleteAll().then((data) =>{
   // console.log(data)
})
.catch((err) =>{
    console.log(err)
})*/