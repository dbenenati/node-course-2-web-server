const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use(function(req, res, next) {   //next exists so we can tell express when our middleware function is done
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', function(err){
        if (err) {
            console.log('Unable to append to server.log');
        }
    })
    next();
});

app.use(function(req, res, next){
    res.render('maintenence.hbs');
})

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', function(){
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', function(text) {
    return text.toUpperCase();
});

app.get('/', function(req, res) {
 //   res.send('<h1>Hello Express</h1>');
    res.render('home.hbs', {
        pageTitle: 'Ye ole Home Page',
        welcomeMessage: 'Dis here dat home page'
    })
});

app.get('/about', function(req, res) {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

app.get('/bad', function (req,res){
    res.send({
        errorMessage: 'Da fuq you doing.  ERROR!'
    })
})

app.listen(3000, function(){
    console.log('Server is up on port 3000');
});