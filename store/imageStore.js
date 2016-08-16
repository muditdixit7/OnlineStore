var Promise = require('es6-promise').Promise;
var fs = require('fs');

function getImages(pid, options) {
    var promise = new Promise(function (resolve, reject) {
        var additionalDetails = [];
        var files = fs.readdirSync('./uploads/');
        files.forEach(function(file) {
            if(file.contains(pid))
                console.log(file);
        });
    });
    return promise;
}

exports.getImages = getImages;