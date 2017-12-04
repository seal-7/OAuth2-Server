var Beer=require('../models/beer');

module.exports.insertBeer=function(req,res){
  var beer=new Beer();

  beer.name=req.body.name;
  beer.type=req.body.type;
  beer.quantity=req.body.quantity;
  beer.userId=req.user.userId;
  beer.save(function(err){
    if(err){
      res.send(err);
    }
    else{
        res.json({ message: 'Data added to the locker!',data:beer });
    }
  });
}

module.exports.findBeer=function(req,res){
  if(req.params.beer_id=="*"){
    Beer.find(function(err,beer){
      if(err){
        res.send(err);
      }
      else{
        res.json(beer);
      }
    });
  }
  else{
    Beer.findById(req.params.beer_id,function(err,beer){
      if(err){
        res.send(err);
      }
      else{
        res.json(beer);
      }
    });
  }
}

module.exports.updateQuantity=function(req,res){

  // Use the Beer model to find a specific beer
  var obj={
    beer_id:req.params.beer_id,
    quantity:req.body.quantity
  }
  Beer.findById(obj.beer_id, function(err, beer) {
    if (err)
      res.send(err);

    // Update the existing beer quantity
    beer.quantity = obj.quantity;
    // Save the beer and check for errors
    beer.save(function(err) {
      if (err)
        res.send(err);

      res.json(beer);
    });
  });

}

module.exports.removeBeer=function(req,res){

  // Use the Beer model to find a specific beer
  Beer.findByIdAndRemove(req.params.beer_id, function(err, beer) {
    if (err)
      res.send(err);
    res.json({ message: 'Data removed from the locker!',data:req.params.beer_id });
  });

}
