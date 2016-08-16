var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('respond with a resource');
});

module.exports = router;


// var mongoClient = require('mongodb').MongoClient;
// var Cookies = require('cookies')
// var appConfig = require(process.cwd() + '\\AppConfig');
// var dbUrl = appConfig.dbConnectionUrl;
// var MongoClient = require(process.cwd() + '\\DataStore\\dbConnection\\MongoClient.js')
// var AccountDbFunctions = require(process.cwd() + '\\DataStore\\DbFunctions\\AccountDbFunctions.js');
// var jwt = require('jsonwebtoken');
// var cookies = null
// exports.authenticationHandler = function(request, response) {
// 	cookies = new Cookies(request, response)
// 	var credentials = {
// 		username: request.body.email,
// 		password: request.body.password
// 	};
// 	AccountDbFunctions.loginQuery(MongoClient.dbCon, credentials, callback, response);

// }

// function callback(isSuccess, response, user) {
// 	if (isSuccess) {
// 		user.password = null
// 		var token = jwt.sign(user, appConfig.secret, {
// 			expiresIn: 3660 // expires in 24 hours
// 		});

// 		cookies.set('auth_token', token)
// 		response.write(new Buffer(JSON.stringify(user)))
// 		response.end()


// 	} else {
// 		response.end();
// 	}
// }



// var mongo = require('mongodb').MongoClient;
// var appConfig = require(process.cwd() + '\\AppConfig');
// var dbUrl = appConfig.dbConnectionUrl;
// var MongoClient = require(process.cwd() + '\\DataStore\\dbConnection\\MongoClient.js')
// var AccountDbFunctions = require(process.cwd() + '\\DataStore\\DbFunctions\\AccountDbFunctions.js');

// exports.registerUserHandler = function(request, response) {

// 	if (request.body.category.valueOf() === 'Customer') {
// 		userObj = {
// 			emailId: request.body.emailId,
// 			password: request.body.password,
// 			phoneNumber: request.body.phoneNumber,
// 			category: request.body.category,
// 			events: []
// 		}
// 		AccountDbFunctions.registerUserQuery(MongoClient.dbCon, userObj, response, callback)
// 	} else {
// 		userObj = {
// 			emailId: request.body.emailId,
// 			password: request.body.password,
// 			phoneNumber: request.body.phoneNumber,
// 			category: request.body.category,
// 			serviceProvided: []
// 		}

// 		AccountDbFunctions.registerUserQuery(MongoClient.dbCon, userObj, response, callback)
// 	}
// }

// function callback(isSuccess, response) {
// 	if (isSuccess) {
// 		response.write('User registration successfully')
// 		response.end();
// 	} else {
// 		response.write('User registration failed')
// 		response.end();
// 	}
// }


// exports.registerUserQuery = function(db, userObj, response, callback) {
// 	var collection = db.collection('UserCollection')
// 	collection.insert(userObj, function(err, docs) {
// 		if (err) {
// 			return callback(false, response)
// 		} else {
// 			return callback(true, response)
// 		}
// 	});
// }

// exports.loginQuery = function(db, credentials, callback, response) {
// 	var collection = db.collection('UserCollection')
// 	collection.findOne({"emailId": credentials.username,"password":credentials.password},{},function(err, result) {
// 		if (err) {
// 			callback(false, response);
// 			}
// 			callback(true, response,result);
// 	});
// }