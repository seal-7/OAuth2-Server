// Load required packages
var User = require('../models/user');

// Create endpoint /api/users for POST
exports.postUsers = function(req, res) {
  console.log("username:"+req.body.username);
  console.log("password:"+req.body.password);
  console.log("name:"+req.body.name);
  console.log("email:"+req.body.email);
  var user = new User({
    username: req.body.username,
    password: req.body.password,
    name: req.body.name,
    email: req.body.email
  });

  user.save(function(err) {
    if (err)
      res.send(err);
    res.json({ message: 'New User Add Succesful!' });
  });
};

// Create endpoint /api/users for GET
exports.getUsers = function(req, res) {
  User.find(function(err, users) {
    if (err)
      res.send(err);

    res.json(users);
  });
};

// Create endpoint /api/users for GET
exports.getUserById = function(req, res) {
  console.log(req.query.id);
  User.findOne({_id:req.query.id},function(err,user){
    if(err){
      res.send({error:"Internal error"});
    }
    else if(user==null){
      res.send({error:"Invalid userId"});
    }
    else{
      console.log(user);
      var userDetails={
        _id:user._id,
        username:user.username,
        name:user.name,
        email:user.email
      }
      res.send(userDetails);
    }
  })
};


// Create endpoint /api/users for GET
exports.signup = function(req, res) {
  res.render('userSignup');
};
