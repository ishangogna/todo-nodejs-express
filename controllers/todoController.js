//using MVC Architecture.
//In order to make this controller accessible on entry point aka app.js:
//Export the function with app as parameter so when we require it on app.js and pass
// app as parameter and invoke the function, it'll pretty much be like doing all these
//app.get, app.post etc on the app.js itself


module.exports = function(app){
    app.get('/',function(req,res){
        res.send('Hello from Controller.');
    });
};