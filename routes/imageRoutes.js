var express = require('express');
var router = express.Router();
var multer  =   require('multer');

var controller = require('../controller/imageController.js');
var when = require('when');
var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname +'-'+ req.params.objectId +'-'+ Date.now());
  }
});
var upload = multer({ storage : storage}).array('productImages',10);

router.get('/getImages/:pid',getImages);

router.post('/uploadImages/:pid',function(req,res,next){
    upload(req,res,function(err) {
        if(err) {
            return res.end(new errors.FileUploadError());
        }
        res.end();
    });
});

function getImages(req, res, next) {
    var options = {};
    var pid = "";
    if (req.params.pid)
        pid = req.params.pid;

    when(controller.getImages(pid, options),
        function success(product) {
            var response = {};
            response.product = product;
            response.status = successStatus;
            res.send(response);
            //return next();

        },
        function error(err) {
            console.log(err);
            var response = {};
            response.status = err.status;
            res.send(response);
            //return next();
        });
}

module.exports = router;