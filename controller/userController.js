var store = require('../store/userStore.js')
var productErrors = require('../routes/errors/productErrors.js')
var Promise = require('es6-promise').Promise;

function authenticateUser(pid, updatedObj, options) {
    var promise = new Promise(function (resolve, reject) {
        var additionalDetails = [];
        validateProductId(pid, additionalDetails);

        if (additionalDetails.length > 0) {
            var err = new productErrors.InvalidArguementError(pid);
            reject(err);
        }
        else{
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

function registerUser(pid, options) {
    var promise = new Promise(function (resolve, reject) {
        var additionalDetails = [];
        validateProductId(pid, additionalDetails);

        if (additionalDetails.length > 0) {
            var err = new productErrors.InvalidArguementError(pid);
            reject(err);
        }
        else{
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

exports.getProductById = getProductById;
exports.getProducts = getProducts;