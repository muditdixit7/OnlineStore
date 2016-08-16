var store = require('../store/userStore.js')
var productErrors = require('../routes/errors/productErrors.js')
var Promise = require('es6-promise').Promise;

function authenticate(userCreds, options) {
    var promise = new Promise(function (resolve, reject) {
        store.authenticate(userCreds, options).then(
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
        var additionalDetails = [];
        validateUserObj(pid, additionalDetails);
        if (additionalDetails.length > 0) {
            var err = new productErrors.InvalidArguementError(additionalDetails);
            reject(err);
        } else {
            store.register(userCreds, options).then(
                function success() {
                    resolve();
                }, function error(err) {
                    reject(err);
                });
        }
    });

    return promise;

}

function validateUserObj(userObj, additionalDetails) {

    if (!userObj)
        additionalDetails.push("No parameters provided");
    else {
        if (!userObj.emailId)
            additionalDetails.push("name of product cannot be empty");

        if (!userObj.password)
            additionalDetails.push("desc of product cannot be empty");

        if (!userObj.phoneNumber)
            additionalDetails.push("desc of product cannot be empty");
    }
}
exports.register = register;
exports.authenticate = authenticate;
>>>>>>> 37402f6f38b7bd925a1ae428aa3b882aae9505fe
