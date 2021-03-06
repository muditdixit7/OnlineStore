var express = require('express');
var router = express.Router();
var when = require('when');
var jwt = require('jsonwebtoken');
var Cookies = require('cookies')

var controller = require('../controller/userController.js');
var config = require('../configuration/config.js');

var successStatus = {
    code: 200,
    msg: "Success"
};

router.post('/authenticate', authenticate);
router.post('/register', register);


router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});


function authenticate(req, res, next) {
    var options = {};
    var userCreds = req.body;

    when(controller.authenticate(userCreds, options),
        function success(user) {
            var response = {};
            response.status = successStatus;

            var token = jwt.sign(user, config.jwt.secret, {
                expiresIn: 3660 // expires in 24 hours
            });
            cookies = new Cookies(req, res)
            cookies.set('auth_token', token)
            res.send(response);
            return next();

        },
        function error(err) {
            console.log(err);
            var response = {};
            response.status = err.status;
            res.send(response);
            return next();
        });

}

function register(req, res, next) {
    var options = {};
    var userObj = req.body;

    when(controller.register(userObj, options),
        function success() {
            var response = {};
            response.status = successStatus;
            res.send(response);
            return next();
        },
        function error(err) {
            console.log(err);
            var response = {};
            response.status = err.status;
            res.send(response);
            return next();
        });

}



module.exports = router;