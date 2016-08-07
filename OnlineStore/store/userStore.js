var product = require('../store/mongoModels/product.js')
var Promise = require('es6-promise').Promise;


function getProductById(pid,options){
    var promise = new Promise(function(resolve,reject){

	product.getProductById(options)
		.then(function success(products) {
			resolve(products);
		}, function error(err) {
			reject(err);
		});
    });
    return promise;
}

function listAllProducts(options) {
    var promise = new Promise(function(resolve,reject){

	product.listProducts(options)
		.then(function success(products) {
			resolve(products);
		}, function error(err) {
			reject(err);
		});
    });
    return promise;
}

function createProduct(productObj ,options) {
	var promise = new Promise(function(resolve,reject){

	product.saveProduct(productObj, options)
		.then(function success(products) {
			resolve(products);
		}, function error(err) {
			reject(err);
		});
    });
    return promise;
}



function updateProduct(pid,options) {
	var promise = new Promise(function(resolve,reject){

	productModel.updateProduct(pid, options)
		.then(function success(products) {
			resolve(products);
		}, function error(err) {
			reject(err);
		});
    });
    return promise;
}

function deleteProduct(pid,options) {
	var promise = new Promise(function(resolve,reject){

	productModel.deleteProduct(pid, options)
		.then(function success(products) {
			resolve(products);
		}, function error(err) {
			reject(err);
		});
    });
    return promise;
}

exports.getProductById = getProductById;
exports.listAllProducts = listAllProducts;
exports.createProduct = createProduct;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;
