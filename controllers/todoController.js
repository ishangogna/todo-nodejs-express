//using MVC Architecture.
//In order to make this controller accessible on entry point aka app.js:
//Export the function with app as parameter so when we require it on app.js and pass
// app as parameter and invoke the function, it'll pretty much be like doing all these
//app.get, app.post etc on the app.js itself


module.exports = function(app){
    //require body-parser to pass requests.
    var bodyParser = require('body-parser')

    //require mongoose for mongoDB
    var mongoose = require('mongoose');
    
    //Connect to MongoDB
    mongoose.connect('mongodb+srv://test:test@cluster0-w1qtc.mongodb.net/nodetest?retryWrites=true&w=majority');

    
    //Create a schema (blueprint) to tell mongo to expect data in the following way.
    var toDoSchema = new mongoose.Schema({
        todo: String
    })

    //Create a model with name 'Todo' with toDoSchema
    var Todo = mongoose.model('Todo',toDoSchema);


    // Dummy item.
    // You must save and write the call back function to handle the error.
    // var itemOne = Todo({todo:'Get flowers'}).save(function(err){
    //     if (err) throw err;
    //     console.log('item saved');
    // })
    


    var urlencodedParser = bodyParser.urlencoded({ extended: true })
    app.get('/todo',function(req,res){

        //find retrieves information from mongoDB.
        //passing an empty object means all info.
        //It takes a callback function to handle err and data is the actual data retrieved itself.
        Todo.find({},function(err,data){
            if(err) throw err;
            console.log(data.length);
            res.render('todo',{data:data});
        })
        
    });

    app.post('/todo',urlencodedParser,function(req,res){
       
        //logging request body to make sure the content is accurate.
       console.log('request body : ' + req.body);

       //creating a new todo and saving to the DB
       var newToDo = Todo(req.body).save(function(err,data){
        if (err) throw err;

        //logging the new todo to ensure the content is accurate.
        console.log('updated data : ' + data);


        //re-quering the DB for all the data for re-rendering the todo view.
        Todo.find({},function(err,data){
            if (err) throw err;
            res.render('todo',{data:data});
            console.log('Successfully re rendered.');
        })

       })
       

        
    })
    
};