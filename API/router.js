const express = require('express');
const Controller = require('./Controller');
const bodyParser = require('body-parser');

/** Server Port */

let routes = function() {
    console.log('Router called');

    /**initialize express */
    let expressApp = express();
    let http = require('http').Server(expressApp);
    expressApp.use(bodyParser.urlencoded({
        extended: false
    }));
    expressApp.use(bodyParser.json());
    var allowCrossDomain = function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        next();
    }
    expressApp.use(allowCrossDomain);
   
    /** Rest API for todo list tasks*/
    expressApp.post('/todoApp',Controller.addTask);
    expressApp.get('/todoApp',Controller.getTasks);
    expressApp.put('/todoApp/:id',Controller.updateTask);
    expressApp.delete('/todoApp/:id',Controller.deleteTask);

    /**listen */
    http.listen(3002);
    console.log('Server is running on port ', http.address().port);
}


module.exports = {
    initRoutes : routes
};