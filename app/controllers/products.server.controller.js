'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	product = mongoose.model('Product'),
	_ = require('lodash');

/**
 * Create a product
 */
exports.create = function(req, res) {
	console.log(req);
	var p = new product(req.body);
	//product.user = req.user;

	p.save(function(err) {
		if (err) {
			console.log(err);
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(product);
		}
	});
};

/**
 * Show the current product
 */
exports.read = function(req, res) {
	res.json(req.product);
};

/**
 * Update a product
 */
exports.update = function(req, res) {
	var product = req.product;

	product = _.extend(product, req.body);

	product.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(product);
		}
	});
};

/**
 * Delete an product
 */
exports.delete = function(req, res) {
	var product = req.product;

	product.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(product);
		}
	});
};

/**
 * List of products
 */
exports.list = function(req, res) {
	product.find().sort('-created').populate('user', 'displayName').exec(function(err, products) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(products);
		}
	});
};

/**
 * product middleware
 */
exports.productByID = function(req, res, next, id) {
	product.findById(id).populate('user', 'displayName').exec(function(err, product) {
		if (err) return next(err);
		if (!product) return next(new Error('Failed to load product ' + id));
		req.product = product;
		next();
	});
};

/**
 * product authorization middleware
 */
//exports.hasAuthorization = function(req, res, next) {
//	if (req.product.user.id !== req.user.id) {
//		return res.status(403).send({
//			message: 'User is not authorized'
//		});
//	}
//	next();
//};