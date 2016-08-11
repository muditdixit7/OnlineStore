var store = require('../store/productStore.js')
var productErrors = require('../routes/errors/productErrors.js')
var Promise = require('es6-promise').Promise;

createProduct({}, {})



function getProductById(pid, options) {
    var promise = new Promise(function (resolve, reject) {
        var additionalDetails = [];
        validateProductId(pid, additionalDetails);
        if (additionalDetails.length > 0) {
            var err = new productErrors.InvalidArguementError(additionalDetails);
            reject(err);
        }
        store.getProductById(pid, options)
            .then(function success(product) {
                resolve(product);
            }, function error(err) {
                reject(err);
            });
    });
    return promise;
}

function getProducts(options) {

    var promise = new Promise(function (resolve, reject) {
        store.getProducts(options).then(function success(products) {
            resolve(products);
        }, function error(err) {
            reject(err);
        });
    });

    return promise;
}

function createProduct(productObj, options) {
    var promise = new Promise(function (resolve, reject) {
        var additionalDetails = [];
        validateProduct(productObj, additionalDetails);

        if (additionalDetails.length > 0) {
            var err = new productErrors.InvalidArguementError(additionalDetails);
            reject(err);
        }

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
    var promise = new Promise(function (resolve, reject) {
        validateProductId(pid, additionalDetails);
        validateProduct(updatedObj, additionalDetails);

        if (additionalDetails.length > 0) {
            var err = new productErrors.InvalidArguementError(pid);
            reject(err);
        }

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
    var promise = new Promise(function (resolve, reject) {
        var additionalDetails = [];
        validateProductId(pid, additionalDetails);

        if (additionalDetails.length > 0) {
            var err = new productErrors.InvalidArguementError(pid);
            reject(err);
        }

        store.deleteProduct(pid, options)
            .then(function success(products) {
                resolve(products);
            }, function error(err) {
                reject(err);
            });
    })
    return promise;
}

function validateProduct(productObj, additionalDetails) {
    productObj.isValid = true; //Initially validating the product

    if (!productObj.title)
        additionalDetails.push("title of product cannot be empty");
    if (!productObj.name)
        additionalDetails.push("name of product cannot be empty");

    if (!productObj.desc)
        additionalDetails.push("desc of product cannot be empty");

    if (!productObj.pricing.price || productObj.pricing.price <= 0)
        additionalDetails.push("title of product cannot be empty");

    if (!productObj.manufactureDetails)
        additionalDetails.push("manufactureDetails of product cannot be empty");
    else {
        if (!productObj.manufactureDetails.manufactureName)
            additionalDetails.push("manufactureDetails.manufactureName of product cannot be empty");

        if (!productObj.manufactureDetails.releaseDate)
            additionalDetails.push("manufactureDetails.releaseDate of product cannot be empty");
    }
}

function validateProductId(pid, additionalDetails) {
    if (!pid) {
        additionalDetails.push("Invalid/Empty product id");
    }
    // if(pid && typeof pid )check typeof pid
}
exports.getProductById = getProductById;
exports.getProducts = getProducts;
exports.createProduct = createProduct;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;