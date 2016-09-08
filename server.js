//Dependencies============
var express = require('express');
var app = express();
var bodyParser= require("body-parser");
var cheerio = require("cheerio");
var handlebars = require("express-handlebars");
var mongoose = require("mongoose");
var request = require("request");
var mongojs = require('mongojs');




//============Midware=============
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.static('public'));


//=============Mongoose Config=====

mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;

// show any mongoose errors
db.on('error', function(err) {
  console.log('Mongoose Error: ', err);
});

// Once the connection is established, console log mongoose connectio successful===
db.once('open', function() {
  console.log('Mongoose connection successful.');
});
var databaseUrl = "scraper";
var collections = ["scrapedData"];

// ========== DATABASE ==============
var db = mongojs('techInsider', ['articles']);

db.on('error', function(err) {
    console.log('Database Error:', err);
});
console.log(db);
//==========Imports=========================
// Import Note and Article models
// var Comment = require('./models/Comment.js');
// var Article = require('./models/Article.js');

//============Routes==========================


// Root Route
app.get('/', function(req, res) {
    // send the articles from db to browser (as json)

     res.send(index.html);

    // db.articles.find(function(err, docs) {
    //     res.json(docs);
    // })
});

//Articles Route will show all articles

app.get('/articles', function(req,res){

		request("http://www.techinsider.io" , function(error, response, html){

			if (error) {
			throw error;
	}
				// var $ = cheerio.load(html);


	    $('a.title').each(function(i, element) {
	    		var results = [];

    		results.title = $(this).text();
			results.link = $(this).attr('href');

				results.push({
			title: results.title,
			link: results.link
			});

			
		console.log('Here are your results:', results);
		
		})
	    	console.log("this is the console frigging log");
	})
				
})











// listen on port 3000
app.listen(3000, function() {
  console.log('App running on port 3000!');
});