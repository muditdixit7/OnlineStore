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
	controller.listAllProducts(req, res, options)
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
	controller.updateProduct(req, res, options)
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
	controller.deleteProduct(req, res, options)
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