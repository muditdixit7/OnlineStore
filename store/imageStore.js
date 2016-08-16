var Promise = require('es6-promise').Promise;
var fs = require('fs');

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