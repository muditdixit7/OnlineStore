var store = require('../store/userStore.js')
var Promise = require('es6-promise');


function listAllProducts(options) {
    var promise = new Promise(function(resolve,reject){

	store.listAllProducts(options)
		.then(function success(products) {
			resolve(products);
		}, function error(err) {
			reject(err);
		});
    })
    return promise;
}

function createProduct(pid,options) {
	var promise = new Promise(function(resolve,reject){

	store.listAllProducts(pid,options)
		.then(function success(products) {
			resolve(products);
		}, function error(err) {
			reject(err);
		});
    })
    return promise;
}

function updateProduct(pid,opitons) {
	var promise = new Promise(function(resolve,reject){

	store.listAllProducts(pid,options)
		.then(function success(products) {
			resolve(products);
		}, function error(err) {
			reject(err);
		});
    })
    return promise;
}

function deleteProduct(pid,options) {
	var promise = new Promise(function(resolve,reject){

	store.listAllProducts(pid,options)
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
