var mongoose = require('mongoose');
var bcrypt = require('bycrypt');
var Promise = require('es6-promise').Promise;
var config = require('../../configuration/config.js');
SALT_WORK_FACTOR = 10;



var userSchema = new mongoose.Schema({
    emailId: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    phoneNumber: String,

}, {
        collection: 'user'
    });

var userModel = mongoose.model('user', userSchema);

UserSchema.pre(save, function (next) {
    var user = this;

    if (!user.isModified('password')) return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);

            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

exports.authenticate = function (userCreds, options) {
    var promise = new Promise(function (resove, reject) {
        userModel.findOne({ username: userCreds.emailId }, function name(err, user) {
            if (err)
                reject(err);
            else {
                user.comparePassword(userCreds.password, function (err, isMatch) {
                    if (err)
                        reject(err);
                    else {
                        user.password = null;
                        resolve(user);
                        console.log('Password matches'); // -&gt; Password123: true
                    }
                });
            }
        });
    });
}

exports.register = function name(userObj, options) {
    var user = createMongoObjectFromRequestObj(userObj);
    var promise = new Promise(function (resolve, reject) {
        user.save(function (err, data) {
            if (err)
                reject(err);
            else {
                resolve();
            }
        });
    });
    return promise;
}

function createMongoObjectFromRequestObj(userObj) {
    var user = new userModel({
        emailId: userObj.emailId,
        password: userObj.password,
        phoneNumber: userObj.phoneNumber
    });
    return user;
}