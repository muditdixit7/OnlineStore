var express = require('express');
var router = express.Router();
var when = require('when');
var controller = require('../controller/userController.js')
var successStatus = {
	code: 200,
	msg: "Success"
};
router.get('/hello',helloWord);
router.get('/getProducts', getProducts);
router.get('/getProductById/:pid',getProductById)
router.post('/updateProduct', updateProduct);
router.post('/createProduct', createProduct);
router.post('/deleteProduct', deleteProduct);

function helloWord(req,res){
    res.send("Hello World");
}

function getProductById(req,res,next){
	var options = {};
	var pid = "";
	if(req.params.pid)
		pid = req.params.pid;
	
	when(controller.getProductById(pid,options),
    function success(products) {
			var reponse = {};
			reponse.products = products;
			reponse.status = successStatus;
			res.send(response);
			//return next();

		}, function error(err) {
            console.log(err);
			var reponse = {};
			reponse.err = err;
			res.send(response);
			//return next();
		});	
}
function getProducts(req, res, next) {
	var options = {};
	if(req.param.psize)
		options.psize = req.params.psize;

	if(req.params.pnum)
		options.pnum = req.params.pnum;
		 	
	when(controller.listAllProducts(options),
    function success(products) {
			var reponse = {};
			reponse.products = products;
			reponse.status = successStatus;
			res.send(response);
			//return next();

		}, function error(err) {
            console.log(err);
			var reponse = {};
			reponse.err = err;
			res.send(respo)
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
			res.send(reponse);
			//return next();

		}, function error(err) {
			var reponse = {};
			reponse.err = err;
			res.send(reponse);
			//return next();
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