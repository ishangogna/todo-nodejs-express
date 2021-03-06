//This is going to be the entry file, as specified to npm.
//This will be an express application.

var express = require('express');
var todoController = require('./controllers/todoController')

var app = express();

//set up template engine.
app.set('view engine', 'ejs')

//set up static files using inbuilt middleware.
//This will be used on all routes.
app.use(express.static('./public'))



//fire Controllers
todoController(app);


//listen to port
app.listen(3000);
console.log('Now listening @ 3000.')