var Promise = require('es6-promise').Promise;
var fs = require('fs');

function getImages(pid, options) {
    var promise = new Promise(function (resolve, reject) {
        var filesToBeSent = [];
        var files = fs.readdirSync('./uploads/');
        try{
        files.forEach(function(file) {
            if(file.indexOf(pid))
                fs.readFile('./uploads/'+file+".png" ,function name(content) {
                    console.log(file);
                    filesToBeSent.push(content);
                });
        });
        resolve(filesToBeSent);
        }catch(err){
            reject(err);
        }
    });
    return promise;
}

exports.getImages = getImages;