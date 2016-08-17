var store = require('../store/imageStore.js')
var productErrors = require('../routes/errors/productErrors.js')
var Promise = require('es6-promise').Promise;

var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");


function uploadImages(pid, images, options) {
    var promise = new Promise(function (resolve, reject) {
        var additionalDetails = [];
        validateProductId(pid, additionalDetails);
        if (additionalDetails.length > 0) {
            var err = new productErrors.InvalidArguementError(additionalDetails);
            reject(err);
        } else {
            store.uploadImages(pid, images, options)
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
}


exports.uploadImages = uploadImages;
