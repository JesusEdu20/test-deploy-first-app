const boom= require("@hapi/boom");


class productService{
  constructor(){
    this.products=[]
    this.generateId=()=>{
      return this.products.length+1
    }

    this.statusInfo=(notFound,founded,id)=>{return id==-1? notFound: founded}


  }

  //retornar array products
  async getProducts(){

   return new Promise((resolve, reject)=>{
    setTimeout(() => {
      resolve(this.products)
    }, 5000);
   })

  }

  //Suministrar id
  async findOne(id){

    let product=this.products.find(product=> product.id==id)

    if(!product){
      throw boom.notFound("Product no found");
    }

    return product
  }


  //Id y nombre de producto para crear nuevo registro
  async createProduct(body){
    this.products.push({
      id: this.generateId(),
      name: body.name,
      price:body.price
    })
  }


  //Update
  async updateAll(id,  name, price){

   let productIndex= this.products.findIndex(product=> product.id==id);

    this.products[productIndex]={

      id:id,
      name:name,
      price:price

    }

    let updateInfo=()=>{return productIndex==-1? boom.notFound("notFound"): `Product updated of Index ${productIndex}`}


    return new Promise((resolve, reject)=>{

      try{
        setTimeout(()=>{
          resolve(updateInfo())
        }, 5000)
      } catch(error){

        throw new Error(error)
      }

     })


  }


  //Delete
  async deleteProduct(id){
    let productIndex= this.products.findIndex(product=> product.id==id);
    this.products.splice(productIndex, 1);

    return this.statusInfo("Product not exist","Product Deleted" , id)


  }

}


/*
getProducts()
findOne(id)
createProduct(body)
 */

//let test=new productService()
//test.updateAll(1)



module.exports=productService;



