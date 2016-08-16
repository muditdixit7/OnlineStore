var user = require('./mongoModels/user.js');
var Promise = require('es6-promise').Promise;

function authenticate(userCreds, options) {
    var promise = new Promise(function (resolve, reject) {
        user.authenticate(userCreds, options).then(
            function success(user) {
                resolve(user);
            }, function error(err) {
                reject(err);
            });
    });

    return promise;

}

function register(userObj, options) {
    var promise = new Promise(function (resolve, reject) {
        user.register(userObj, options).then(
            function success() {
                resolve();
            }, function error(err) {
                reject(err);
            });
    });

    return promise;

}

exports.register = register;
exports.authenticate = authenticate;