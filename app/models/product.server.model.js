'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Product Schema
 */
var ProductSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	title: {
		type: String,
		default: '',
		trim: true,
		required: 'Title cannot be blank'
	},
	image:String,
	description:String,
	price:Number,  //String in orignial data.json, but this should be a number (or cast)
	online:Boolean,
	quantity:Number,
	details:String

});

mongoose.model('Product', ProductSchema);