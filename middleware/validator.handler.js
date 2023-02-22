const boom= require("@hapi/boom");

function validatorHandler (schema, property){
  return (req, res, next)=>{

    const data=req[property]
    const {error} = schema.validate(data, {abortEarly: false});//sirve para enviar todos los errores y enviarlos todos en conjunto.

    if(error){
      next(boom.badRequest(error))
    }

    next();
  }
}

module.exports = validatorHandler
