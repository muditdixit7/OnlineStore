var express = require('express');
var router = express.Router();
var when = require('when');
var controller = require('../controller/userController.js')
var successStatus = {
	code: 200,
	msg: "Success"
};
router.get('/hello',helloWord);
router.get('/listAllProducts', listAllProducts);
router.get('/updateProduct', updateProduct);
router.get('/createProduct', createProduct);
router.get('/deleteProduct', deleteProduct);

function helloWord(req,res){
    res.send("Hello World");
}
function listAllProducts(req, res, next) {
	var options = {};
	when(controller.listAllProducts(options),
    function success(products) {
			var reponse = {};
			reponse.products = products;
			reponse.status = successStatus;
			//return next();

		}, function error(err) {
            console.log(err);
			var reponse = {};
			reponse.err = err;
			//return next();
		});
}

function createProduct(req, res, next) {
	var options = {};
    var productFromRequest = req.body;
	controller.createProduct(productFromRequest,options)
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

module.exports = router;