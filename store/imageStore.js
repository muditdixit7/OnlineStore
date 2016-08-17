var Promise = require('es6-promise').Promise;

var product = require('../store/mongoModels/product.js')

function uploadImages(pid, images, options) {
    var promise = new Promise(function (resolve, reject) {
        product.uploadImages(pid, images, options)
            .then(function success(products) {
                resolve(products);
            }, function error(err) {
                reject(err);
            });
    });
    return promise;
}

exports.uploadImages = uploadImages;