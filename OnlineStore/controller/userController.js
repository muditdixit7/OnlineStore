var store = require('../store/userStore.js')
var Promise = require('es6-promise').Promise;

createProduct({},{})



function getProductById(pid,options){
    var promise = new Promise(function(resolve,reject){

	store.getProductById(pid,options)
	.then(function success(product) {
			resolve(products);
		}, function error(err) {
			reject(err);
		});
    });
    
   return promise;
}

function listAllProducts(options) {
    var promise = new Promise(function(resolve,reject){

	store.listAllProducts(options).then(function success(products) {
			resolve(products);
		}, function error(err) {
			reject(err);
		});
    });
    
   return promise;
}

function createProduct(productObj,options) {
	var promise = new Promise(function(resolve,reject){
    var additionalDetails = validateProduct(productObj);
    
    if(!productObj.isValid)
        reject(additionalDetails)

	store.createProduct(productObj,options)
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

	store.updateProduct(pid,options)
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

	store.deleteProduct(pid,options)
		.then(function success(products) {
			resolve(products);
		}, function error(err) {
			reject(err);
		});
    })
    return promise;
}

function validateProduct(productObj){
    productObj.isValid = true;//Initially validating the product
    return "";
}

exports.getProductById = getProductById;
exports.listAllProducts = listAllProducts;
exports.createProduct = createProduct;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;
