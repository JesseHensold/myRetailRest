'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	products = require('../../app/controllers/products.server.controller');

module.exports = function(app) {
    app.all('/', function(req, res, next) {
       // res.header('Access-Control-Allow-Origin', "*");
        //res.header('Access-Control-Allow-Headers', "X-Requested-With");
        next();
    });
	// product Routes
	app.route('/products')
		.get(products.list)
		//.post(users.requiresLogin, products.create);
		.post(products.create);

	app.route('/products/:productId')
		.get(products.read)
		//.put(users.requiresLogin, products.hasAuthorization, products.update)
        .put(products.update)
		//.delete(users.requiresLogin, products.hasAuthorization, products.delete);
        .delete(products.delete);

	// Finish by binding the product middleware
	app.param('productId', products.productByID);
};