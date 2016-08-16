var store = require('../store/imageStore.js')
var productErrors = require('../routes/errors/productErrors.js')
var Promise = require('es6-promise').Promise;

var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");


function getImages(pid, options) {
    var promise = new Promise(function (resolve, reject) {
        var additionalDetails = [];
        validateProductId(pid, additionalDetails);
        if (additionalDetails.length > 0) {
            var err = new productErrors.InvalidArguementError(additionalDetails);
            reject(err);
        } else {
            store.getImages(pid, options)
                .then(function success(images) {
                    resolve(images);
                }, function error(err) {
                    reject(err);
                });
        }
    });
    return promise;
}




function validateProductId(pid, additionalDetails) {
    if (!checkForHexRegExp.test(pid)) {
        additionalDetails.push("Invalid/Empty product id");
    }
    // if(pid && typeof pid )check typeof pid
}
exports.getImages = getImages