var store = require('../store/userStore.js')
var Promise = require('es6-promise');


function listAllProducts(req, res, next) {
    var promise = new Promise(function(resolve,reject){

	store.listAllProducts(req, res, options)
		.then(function success(products) {
			resolve(products);
		}, function error(err) {
			reject(err);
		});
    })
    return promise;
}

function createProduct(req, res, next) {
	var promise = new Promise(function(resolve,reject){

	store.listAllProducts(req, res, options)
		.then(function success(products) {
			resolve(products);
		}, function error(err) {
			reject(err);
		});
    })
    return promise;
}

function updateProduct(req, res, next) {
	var promise = new Promise(function(resolve,reject){

	store.listAllProducts(req, res, options)
		.then(function success(products) {
			resolve(products);
		}, function error(err) {
			reject(err);
		});
    })
    return promise;
}

function deleteProduct(req, res, next) {
	var promise = new Promise(function(resolve,reject){

	store.listAllProducts(req, res, options)
		.then(function success(products) {
			resolve(products);
		}, function error(err) {
			reject(err);
		});
    })
    return promise;
}

exports.listAllProducts = listAllProducts;
exports.createProduct = createProduct;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;
