var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var config = {
    user: 'divmit13',
    database: 'divmit13',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};
var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

function hash (input, salt){
       var hashed = crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512');
       return hashed.toString('hex');
}
app.get('/hash/:input',function(req,res){
    var hashedString = hash(req.params.input, 'this is some random string');
});

app.get('/profile', function(req,res){
    res.sendFile(path.join(__dirname, 'ui', 'profile.html'));
});


app.get('/ui/main.js', function(req,res){
    res.sendfile(path.join(__dirname, 'ui', 'main.js'));
});
app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});


var pool = new Pool(config);
app.get('/test-db', function(req,res){
    // make a select request
    // return a response with the results
    pool.query('SELECT * FROM test', function(err,result){
        if(err){
            res.status(500).send(err.toString());
        } else{
            res.send(JSON.stringify(result.rows));
        }
    });
});
var counter =0;
app.get('/counter',function(req,res){
    counter= counter+1;
    res.send(counter.toString());
});

var names=[];
app.get('/submit-name', function(req,res) {
    //get the name from request
    var name = req.query.name;
    
    names.push(name);
    //json javascript object notation
    res.send(JSON.stringify(names));
});
app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
