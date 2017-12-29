var express = require('express');
var passport = require('passport');
var router = express.Router();

//controllers
var beerController = require('../controllers/beer');
var userController = require('../controllers/user');
var authController = require('../controllers/auth');
var clientController = require('../controllers/client');
var oauth2Controller = require('../controllers/oauth2');


/* GET home page. */
router.get('/',authController.isAuthenticated, function(req, res, next) {
    res.json({"status":"working"});
});

router.post('/data',authController.isAuthenticated,beerController.insertBeer);

router.get('/data/:beer_id',authController.isAuthenticated,beerController.findBeer);

router.put('/data/:beer_id',authController.isAuthenticated,beerController.updateQuantity);

router.delete('/data/:beer_id',authController.isAuthenticated,beerController.removeBeer);


// Create endpoint handlers for /users
router.route('/users')
  .post(userController.postUsers)
  .get(authController.isAuthenticated,userController.getUserById);


router.route('/users/signup')
  .get(userController.signup);

// Create endpoint handlers for /clients
router.route('/clients/signup')
  .post(authController.isAuthenticated, clientController.postClients)
  .get(authController.isAuthenticated, clientController.getClients);


  // Create endpoint handlers for oauth2 authorize
  router.route('/oauth2/authorize')
    .get(authController.isAuthenticated, oauth2Controller.authorization)
    .post(authController.isAuthenticated, oauth2Controller.decision);

  // Create endpoint handlers for oauth2 token
  router.route('/oauth2/token')
    .post(authController.isClientAuthenticated, oauth2Controller.token);


module.exports = router;
