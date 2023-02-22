//Middleware de tipo error

//Creamos función que nos hará llegar a un middleware de tipo error:

function logErrors (err, req, res, next){
  console.log(err);
  //mostrar el error en servidor para poder monitorearlo
  next(err);
  //importante para saber que se esta enviando a un middleware de tipo error,
  //si no tiene el error dentro entonces se esta mandando a uno normal
}


function handlerError(err, req, res, next){
  res.status(500).json({
    message:err.message,
    stack:err.stack
  })
}

//Error Handler tipo boom
function boomErrorHandler(err, req, res, next){
  if(err.isBoom){
    const { output }=err;
    res.status(output.statusCode).json(output.payload);
  }
  next(err);
}

module.exports={logErrors, handlerError, boomErrorHandler};



