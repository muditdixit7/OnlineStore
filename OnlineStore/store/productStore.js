var product = require('../store/mongoModels/product.js')
var Promise = require('es6-promise').Promise;


function getProductById(pid, options) {
	var promise = new Promise(function(resolve, reject) {

		product.getProductById(pid, options)
			.then(function success(products) {
				resolve(products);
			}, function error(err) {
				reject(err);
			});
	});
	return promise;
}

function getProducts(options) {
	var promise = new Promise(function(resolve, reject) {
    product.getProducts(options)
			.then(function success(products) {
				resolve(products);
			}, function error(err) {
				reject(err);
			});
	});
	return promise;
}

function createProduct(productObj, options) {
	var promise = new Promise(function(resolve, reject) {

		product.saveProduct(productObj, options)
			.then(function success(product) {
				resolve(product);
			}, function error(err) {
				reject(err);
			});
	});
	return promise;
}



function updateProduct(pid, updatedObj, options) {
	var promise = new Promise(function(resolve, reject) {

		product.updateProduct(pid, updatedObj, options)
			.then(function success(products) {
				resolve(products);
			}, function error(err) {
				reject(err);
			});
	});
	return promise;
}

function deleteProduct(pid, options) {
	var promise = new Promise(function(resolve, reject) {

		product.deleteProduct(pid, options)
			.then(function success(products) {
				resolve(products);
			}, function error(err) {
				reject(err);
			});
	});
	return promise;
}

exports.getProductById = getProductById;
exports.getProducts = getProducts;
exports.createProduct = createProduct;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;