//Dependencies============
var express = require('express');
var app = express();
var bodyParser= require("body-parser");
var cheerio = require("cheerio");
var handlebars = require("express-handlebars");
var mongoose = require("mongoose");
var request = require("request");
var logger = require('morgan');





//============Midware=============
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(logger('dev'));


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


//==========Imports=========================
// Import Note and Article models
var Comment = require('./models/comment.js');
var Article = require('./models/article.js');

//============Routes==========================


// ===========Root Route
app.get('/', function(req, res) {
    // send the articles from db to browser (as json)

     res.send(index.html);

    // db.articles.find(function(err, docs) {
    //     res.render(docs);
    // })
});


//=============Articles Route will show all articles

app.get('/scrape', function(req,res){

		request("http://www.techinsider.io" , function(error, response, html){

			if (error) {
			throw error;
			}
			
			var $ = cheerio.load(html);


	    	$('a.title').each(function(i, element) {
	    		var results ={};

    		results.title = $(this).text();
			results.link = $(this).attr('href');
			// results.article = $(this).text();

			var newArticle = new Article (results);

				newArticle.save(function(err,doc){
					if(err){
						console.log(err);
					}
					else{
						console.log(doc);
					}

				
				});
			});
	    	res.send("Scrape Complete");
		});
				
})

//=======retrieiving the articles from DB===========

app.get('/articles', function(req, res){
	Article.find({}, function(err,doc){
		if (err){
			console.log(err);
		}
		else{
//send the results back as json object
			res.json(doc);
		}
	});

});

app.post("/articles/:id", function(req,res){
		var newComment= new Comment(req.body);

		newComment.save(function(err,doc){

			if(err){
				console.log(err);
			}
			else{
			//find the comment via id param in DB and update it to show only recently made one
			Article.findOneAndUpdate({'_id': req.params.id}, {'comment': doc._id})
			
				.exec(function(err,doc){
					if(err){
						console.log(err);
					} else{
						res.send(doc);
					}
				});
			}
		});

});













// listen on port 3000
app.listen(3000, function() {
  console.log('App running on port 3000!');
});










