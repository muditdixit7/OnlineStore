var express = require('express');
var router = express.Router();
var multer  =   require('multer');

var errors = require('./errors/productErrors.js')
var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname +'-'+ req.params.objectId +'-'+ Date.now());
  }
});
var upload = multer({ storage : storage}).array('productImages',10);

router.get('/getImages/:objectId',function(req,res,next){
      res.sendFile(__dirname + "/index.html");
});

router.post('/uploadImage/:objectId',function(req,res,next){
    upload(req,res,function(err) {
        if(err) {
            return res.end(new errors.FileUploadError());
        }
        res.end();
    });
});

module.exports = router;