var store = require('../store/userStore.js')
var Promise = require('es6-promise').Promise;

createProduct({}, {})



function getProductById(pid, options) {
	var promise = new Promise(function(resolve, reject) {

		store.getProductById(pid, options)
			.then(function success(product) {
				resolve(product);
			}, function error(err) {
				reject(err);
			});
	});

	return promise;
}

function listAllProducts(options) {
    var pageSize = 10;
    var pageNumber = 1;
	var promise = new Promise(function(resolve, reject) {

        if(options.psize)
            pageSize = psize;

        if(options.pnum)
            pageNumber = pnum;    
		store.listAllProducts(options).then(function success(products) {
			resolve(products);
		}, function error(err) {
			reject(err);
		});
	});

	return promise;
}

function createProduct(productObj, options) {
	var promise = new Promise(function(resolve, reject) {
		var additionalDetails = validateProduct(productObj);

		if (!productObj.isValid)
			reject(additionalDetails)

		store.createProduct(productObj, options)
			.then(function success(product) {
				resolve(product);
			}, function error(err) {
				reject(err);
			});
	})
	return promise;
}

function updateProduct(pid, updatedObj, options) {
	var promise = new Promise(function(resolve, reject) {
		// if(validateObject(updatedObj))    
		store.updateProduct(pid, updatedObj, options)
			.then(function success(products) {
				resolve(products);
			}, function error(err) {
				reject(err);
			});
	})
	return promise;
}

function deleteProduct(pid, options) {
	var promise = new Promise(function(resolve, reject) {

		store.deleteProduct(pid, options)
			.then(function success(products) {
				resolve(products);
			}, function error(err) {
				reject(err);
			});
	})
	return promise;
}

function validateProduct(productObj) {
	productObj.isValid = true; //Initially validating the product
	return "";
}

exports.getProductById = getProductById;
exports.listAllProducts = listAllProducts;
exports.createProduct = createProduct;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;