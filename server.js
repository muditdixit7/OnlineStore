var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var when = require('when');
var Promise = require('es6-promise').Promise;

var routes = require('./routes/index');
var userRoutes = require('./routes/userRoutes.js');
var productRoutes = require('./routes/productRoutes');
var imageRoutes = require('./routes/imageRoutes.js');
var product = require('./store/mongoModels/product.js');

var app = express();

var server = http.createServer(app);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/', userRoutes);
app.use('/', productRoutes);
app.use('/', imageRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}
// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

function startServer() {
    var promise = new Promise(function (resolve, reject) {
        when(product.initPromise(),
            function success() {
                const PORT = process.env.PORT || 3000
                server.listen(PORT,'0.0.0.0',function(){
                console.log('app runnig on :',PORT);    
                resolve();
                });
            }, function error() {
                console.log('Db not connected')
                reject();
            });
            
    });
    return promise;
}

exports.startServer = startServer;
