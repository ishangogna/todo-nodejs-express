var express = require('express');

var app = express();

app.get('/',function(req,res){
    res.send('Hello from Express.')
})

app.listen(3000);
console.log('Now listening @ 3000.')