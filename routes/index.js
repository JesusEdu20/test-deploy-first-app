/*
Express.Router
Crea un controlador(handler) de rutas modulares y montables. Una instancia de Router es un sistema de enrutamiento y middleware completo, por esa razón lo podemos tomar como si fuera una mini app.

Cada modulo de nuestras rutas es una mini aplicación en la que creamos sus rutas independientes y podemos incluirle middlewares, que se ejecutarán cuando se coincida con el path.

Qué es un middleware?
Un middleware es un bloque de código que se ejecuta entre la petición que hace el usuario (request) hasta que la petición llega al servidor.

Fuente:

Middlewares en Node.js

App.use
app.use Lo que hace es montar un middleware en la ruta especificada. Por ejemplo:
 */

const express= require("express");

let routerProducts= require("./products.router");
/*let routerUsers= require("./users.router");*/



let deployApi=(app)=>{
  const router= express.Router();
  app.use("/api/v1", router);
  router.use("/products", routerProducts);
  /*router.use("/users", routerUsers);*/
}

module.exports=deployApi

