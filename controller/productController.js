var store = require('../store/productStore.js')
var productErrors = require('../routes/errors/productErrors.js')
var Promise = require('es6-promise').Promise;
var moment = require('moment')
var formats = [
    moment.ISO_8601,
    "YYYY/MM/DD/  :)  HH*mm*ss"
];

var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");



function getProductById(pid, options) {
    var promise = new Promise(function (resolve, reject) {
        var additionalDetails = [];
        validateProductId(pid, additionalDetails);
        if (additionalDetails.length > 0) {
            var err = new productErrors.InvalidArguementError(additionalDetails);
            reject(err);
        } else {
            store.getProductById(pid, options)
                .then(function success(product) {
                    resolve(product);
                }, function error(err) {
                    reject(err);
                });
        }
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
        else {
            store.createProduct(productObj, options)
                .then(function success(product) {
                    resolve(product);
                }, function error(err) {
                    reject(err);
                });
        }
    })
    return promise;
}

function updateProduct(pid, updatedObj, options) {
    var promise = new Promise(function (resolve, reject) {
        var additionalDetails = [];
        validateProductId(pid, additionalDetails);

        if (additionalDetails.length > 0) {
            var err = new productErrors.InvalidArguementError(pid);
            reject(err);
        }
        else {
            store.updateProduct(pid, updatedObj, options)
                .then(function success(products) {
                    resolve(products);
                }, function error(err) {
                    reject(err);
                });
        }
    });
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
        else {
            store.deleteProduct(pid, options)
                .then(function success() {
                    resolve();
                }, function error(err) {
                    reject(err);
                });
        }
    });
    return promise;
}

function validateProduct(productObj, additionalDetails) {


    if (!productObj)
        additionalDetails.push("No parameters provided");

    else {
        if (!productObj.title)
            additionalDetails.push("title of product cannot be empty");
        if (!productObj.name)
            additionalDetails.push("name of product cannot be empty");

        if (!productObj.desc)
            additionalDetails.push("desc of product cannot be empty");

        if (!productObj.pricing.price || productObj.pricing.price <= 0)
            additionalDetails.push("title of product cannot be empty");

        if (!productObj.manufacturingDetails)
            additionalDetails.push("manufactureDetails of product cannot be empty");
        else {
            if (!productObj.manufacturingDetails.modelNumber)
                additionalDetails.push("manufactureDetails.manufactureName of product cannot be empty");

            if (!productObj.manufacturingDetails.releaseDate)//|| moment(productObj.manufactureDetails.releaseDate, formats, true).isValid())
                additionalDetails.push("manufactureDetails.releaseDate of product is either empty or invalid");
        }
    }
}

function validateProductId(pid, additionalDetails) {
    if (!checkForHexRegExp.test(pid)) {
        additionalDetails.push("Invalid/Empty product id");
    }
    // if(pid && typeof pid )check typeof pid
}
exports.getProductById = getProductById;
exports.getProducts = getProducts;
exports.createProduct = createProduct;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;