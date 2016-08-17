var express = require('express');
var router = express.Router();
var multer = require('multer');

var controller = require('../controller/imageController.js');
var when = require('when');

upload = multer({
    dest: './uploads/'
})

var successStatus = {
    code: 200,
    msg: "Success"
};


router.post('/uploadImages/:pid', upload.any(), uploadImages);


function uploadImages(req, res, next) {
    var options = {};
    var pid = "";
    if (req.params.pid)
        pid = req.params.pid;
    var images = req.files;

    when(controller.uploadImages(pid, images, options),
        function success(images) {
            var response = {};
            response.images = images;
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