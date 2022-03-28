const express = require('express');
const contenedor = require('./contenedor');
//me traigo los métodos del contenedor
const {Contenedor} = require('./contenedor');

//Creando servidor
const app = express();
app.listen(8080, () => console.log("Estamos listos"));

//devuelve todos los productos como array
app.get('/productos', async (req, res) =>{
    const resultado = await Contenedor.getAll();

    res.json({
        data: resultado
    })
})

app.get('/productoRandom', async (req, res) =>{
    const numeroRandom = (min, max) =>{
        return Math.floor(Math.random() * (max - min) + min);
    };
    const todosLosProductos = await Contenedor.getAll();

   const productosId = todosLosProductos.map((prod) => prod.id);
    console.log(productosId)
   const random = numeroRandom(0, productosId.length);
    console.log(random)
   //console.log('RAMDOM', random)

   const idRandom = productosId[random];
   console.log(idRandom)

   const resultado = await Contenedor.getById(idRandom);

   res.json({
       data: resultado
   })

})
