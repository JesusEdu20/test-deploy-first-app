const express=require("express");
//const productService = require("../services/products.service");
const service=require("../services/products.service");
const productService=new service()
const router= express.Router()
const {createProductSchema, updateProductSchema,  getProductSchema}= require("../schema/product.schema")
const validatorHandler= require("../middleware/validator.handler")


//GET: Obtener

router.get("/", async (req, res, next)=>{

  try{
    res.json(await productService.getProducts());


  } catch (error){
      next(error)
  }

})

router.get("/:id",async (req, res, next)=>{

  const {id}=req.params

  try{res.json(await productService.findOne(id));}

  catch(error){
    next(error)
  }


})

//POST: Crear

router.post("/",validatorHandler(createProductSchema, "body"), async (req, res)=>{
  const body=req.body;
  await productService.createProduct(body);
  res.send("Product Created")
})


//PUT: replace all

router.put("/:id", validatorHandler(updateProductSchema, "body"),async (req, res)=>{
  const {id}=req.params;

  const body=req.body;

  let test=await productService.updateAll(id, body.name, body.price);
  res.send(test);

})

//DELETE: delete a product

router.delete("/:id",async (req, res)=>{
  const {id}=req.params;
  let test=await productService.deleteProduct(parseInt(id));
  res.send(test);

})




/*
router.get("/filters",(req, res)=>{
  res.send("<h1 style='color:rgb(22,55,66)'>hola</h1>");
})


router.get("/filters",(req, res)=>{
  res.send("<h1 style='color:rgb(22,55,66)'>hola</h1>");
})*/




/*router.get("/categories",(req, res)=>{
  res.send("categories");
})  */


/*
router.get("/categories",(req, res)=>{
  const {size}=req.query
  let limit= size || 10;
  let categories=[]

  for(let index=0; index<limit; index++){


     categories.push(

          {
            id: "1",
            categoría: "cars"
          },


      )

  }

  res.json(categories)
})
*/

/*Enviar info*/
/*
router.post("/",(req, res)=>{
  const body=req.body;
  const productService=new service()
  productService.createProduct(body.id, body.product);

  res.json(productService.getProducts())

})
*/




//Actualizar parcialmente
/*
router.patch("/:id",(req, res)=>{
  const body=req.body;
  const {id}=req.params
  res.json(
    {
      message:"partial update",
      data:body,
      id,
    }
  )
})*/

/*
router.patch("/:id",(req, res)=>{
  const body=req.body;
  const {id}=req.params
  res.json(
    {
      message:"partial update",
      data:body,
      id,
    }
  )
})


router.delete("/:id",(req, res)=>{
  const {id}=req.params
  res.json(
    {
      message:"Product deleted",
      id,
    }
  )
})
*/

//Ejercicio con peticion get para devolver status code 404
// La misma sirve como ejemplo para retornar status code

router.get("/:id",(req, res)=>{
  const body=req.body;
  const {id}=req.params

  if(id==="999"){
    res.status(404).json(
      {
        message:"not found"
      }
    )
  }
  else{
    res.json(
      {
        message:"partial update",
        data:body,
        id,
      }
    )
  }

})



module.exports=router;
