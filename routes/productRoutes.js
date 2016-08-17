var express = require('express');
var router = express.Router();
var when = require('when');
var jwt = require('jsonwebtoken');
var appConfig = require('../configuration/config.js');
var Cookies = require('cookies')
var controller = require('../controller/productController.js')

var successStatus = {
    code: 200,
    msg: "Success"
};

router.get('/hello', helloWord);

router.use(function (req, res, next) {
    if (!req.decoded) {
        var cookies = new Cookies(req, res)
        var token = cookies.get('auth_token');
        if (req.headers['x-access-token'] === 'x-access-token') {
            next();
        }
        else {
            if (token) {
                jwt.verify(token, appConfig.secret, function (err, decoded) {
                    if (err) {
                        res.json({ status: 403, message: 'Missing Authentication token' })
                        res.end()
                    } else {
                        req.decoded = decoded
                        next()
                    }
                })
            }
            else {
                res.json({ status: 403, message: 'Missing Authentication token' })
                res.end()
            }
        }
    }
})


router.get('/getProducts', getProducts);
router.get('/getProductById/:pid', getProductById)
router.post('/updateProduct/:pid', updateProduct);
router.post('/createProduct', createProduct);
router.delete('/deleteProduct/:pid', deleteProduct);

function helloWord(req, res) {
    res.send("Hello World");
}

function getProductById(req, res, next) {
    var options = {};
    var pid = "";
    if (req.params.pid)
        pid = req.params.pid;

    when(controller.getProductById(pid, options),
        function success(product) {
            var response = {};
            response.product = product;
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

function getProducts(req, res, next) {
    var options = {};
    if (req.query.psize)
        options.psize = req.query.psize;

    if (req.query.pnum)
        options.pnum = req.query.pnum;

    when(controller.getProducts(options),
        function success(products) {
            var response = {};
            response.products = products;
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

function createProduct(req, res, next) {
    var options = {};
    var productFromRequest = req.body;
    controller.createProduct(productFromRequest, options)
        .then(function success(product) {
            var reponse = {};
            reponse.product = product;
            reponse.status = successStatus;
            res.send(reponse);
            return next();

        }, function error(err) {
            var response = {};
            response.status = err.status;
            res.send(response);
            return next();
        });
}

function updateProduct(req, res, next) {
    var options = {};
    if (req.params.pid)
        pid = req.params.pid;

    controller.updateProduct(pid, req.body, options)
        .then(function success() {
            var response = {};
            response.status = successStatus;
            res.send(response);
            return next();

        }, function error(err) {
            var response = {};
            response.status = err.status;
            res.send(response);
            return next();
        });
}

function deleteProduct(req, res, next) {
    var options = {};
    if (req.params.pid)
        var pid = req.params.pid;
    controller.deleteProduct(pid, options)
        .then(function success() {
            var response = {};
            response.status = successStatus;
            res.send(response)
            return next();

        }, function error(err) {
            var response = {};
            response.status = err.status;
            res.send(response);
            return next();
        });
}

module.exports = router;