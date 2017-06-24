function wrapError(error){
  return { errors:[error] };
}

const status = {
   ok:function(res, data){
     let pack = (data) ? data : {};
     res.status(200).send(pack);
   },
   created:function(res, data){
     let pack = (data) ? data : {};
     res.status(201).send(pack);
   },
   incomplete:function(res, err){
     // use this for the user missing preconditions
     let error = (err) ? err : {text:"We had an issue making you resource due to a lack of details."};
     res.status(400).send(wrapError(error));
   },
   conflict:function(res, err){
     // use this for conflicts due to prexisting condtiions
     let error = (err) ? err : {text:"We had an issue making you resource due to an unknown conflict."};
     res.status(409).send(wrapError(error));
   },
   notFound:function(res, err){
     let error = (err) ? err : {text:"We could not find what you are looking for due to an unknown conflict."};
     res.status(404).send(wrapError(error));
   },
   notAuthorized:function(res, err){
     let error = (err) ? err : {text:"You aren't authorized to access this feature."};
     res.status(403).send(wrapError(error));
   },
   serverError:function(res, err){
     let error = (err) ? err : {text:"There seems to be an issue with our server due to an unknown conflict."};
     res.status(500).send(wrapError(error));
   },
}

class validate {
  constructor(authorization){
    this.key = authorization;
  }

  api(req, res, resolve){
    if(req.headers &&
       req.headers.authorization &&
       req.headers.authorization === "Bearer " + this.key){
         resolve();
       } else {
         status.notAuthorized(res, {text:"Your authentication is invalid, please provide a proper authorization key!"});
       }
  }

}

exports.validate = validate;
exports.status = status;
