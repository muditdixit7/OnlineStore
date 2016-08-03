var express = require('express');
var router = express.Strategy;
var controller = require('../controller/userController.js')
var successStatus = {
	code: 200,
	msg: "Success"
};

router.get('/listAllProducts', listAllProducts);

router.get('/updateProduct', updateProduct);

router.get('/createProduct', createProduct);

router.get('/deleteProduct', deleteProduct);


function listAllProducts(req, res, next) {
	var options = {};
	controller.listAllProducts(options)
		.then(function success(products) {
			var reponse = {};
			reponse.products = products;
			reponse.status = successStatus;
			return next();

		}, function error(err) {
			var reponse = {};
			reponse.err = err;
			return next();
		});
}

function createProduct(req, res, next) {
	var options = {};
	controller.createProduct(req.body)
	.then(function success(products) {
			var reponse = {};
			reponse.products = products;
			reponse.status = successStatus;
			return next();

		}, function error(err) {
			var reponse = {};
			reponse.err = err;
			return next();
		});
}

function updateProduct(req, res, next) {
	var options = {};
	if(req.body.id)
		var pid = req.body.id;
	controller.updateProduct(pid, options)
		.then(function success(products) {
			var reponse = {};
			reponse.products = products;
			reponse.status = successStatus;
			return next();

		}, function error(err) {
			var reponse = {};
			reponse.err = err;
			return next();
		});
}

function deleteProduct(req, res, next) {
	var options = {};
	if(req.body.id)
		var pid = req.body.id;
	controller.deleteProduct(pid, options)
		.then(function success(products) {
			var reponse = {};
			reponse.products = products;
			reponse.status = successStatus;
			return next();

		}, function error(err) {
			var reponse = {};
			reponse.err = err;
			return next();
		});
}