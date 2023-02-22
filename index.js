
/*PRIMER MODULO
COMO MONTAR UN SERVIDOR CON EXPRESS.js

const express= require("express");
//const faker= require("faker")

const app= express();
const port = 3000;


app.get("/", (req, res)=>{
  res.send("hola mi server en express");
})


app.get("/servicios", (req, res)=>{
  res.json({
    services:[
      {servicio1:"other"},
      {servicio2:"other"}
    ]
  });
})

/*----------------------------------------------------------------------



GET: RECIBIR PARÁMETROS
>(:parámetro) paso de parámetros a través de la url

/* Todos los ENDPOINTS que se encuentren de forma especifíca
deben ir antes de los ENDPOINT DINÁMICOS, para que no sean
tomados como parámetro

app.get("/productos/filter", (req, res)=>{
  res.send("Endpoint de forma específica")
})

app.get("/productos/:id", (req, res)=>{
  const { id }=req.params;
  res.json({
    product:[

      {
        id,
        telefono:"iphone",
        precio: "400$",
        img:"https://i.dummyjson.com/data/products/1/1.jpg"
      },

    ]
  });
})



/*GET: PARÁMETRO QUERY
parámetro opcional, por tal motivo no se especifica el mismo en el
endpoint
> los query poseen una estrategia de paginación (limit, offset)

app.get("/users", (req, res)=>{
  const { limit, offset }=req.query;
 if(limit && offset){
  res.json({
    limit,
    offset
  })
 }
 else{res.send("no hay parámetros")}
})



app.get("/products", (req, res)=>{
  const {size}=req.query
  let limit= size || 10;
  const products=[]
  for(let index=0; index<limit; index++){

    products.push(
      {
        test:"work",
        mensaje:"no se pudo generar fake data, para completar el ejercicio debido a que el repo del paquete fué borrado, se intentó con otro paquete sin embargo no se obtuvo resultados"

      }
    )

  }

  res.json(products)
})


app.listen(port, ()=>{
  console.log("corriendo en el puero " + port)

})*/


/*SEGUNDO MODULO*/
const express= require("express");
const cors= require("cors");

let deployApi=require("./routes/index.js");
const {logErrors, handlerError,  boomErrorHandler}=require("./middleware/error.handler.js")
const app= express();
const port = 3000;

//Middleware nativo de Js que permite recibir info en formato json
// a través de POST
app.use(express.json())

const whiteList=["http://127.0.0.1:5500"];

const options={
  origin:(origin, callback)=>{
    if(whiteList.includes(origin)||!origin){
      callback(null, true);
    }
    else{
      callback(new Error("Access denied"));
    }
  }
}


app.use(cors(options))
deployApi(app)


app.use(logErrors, boomErrorHandler, handlerError);


app.listen(port, ()=>{
  console.log("corriendo en el puerto " + port)
})




