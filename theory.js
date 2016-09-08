var express = require('express');
var app = express();
var mongojs = require('mongojs');
var bodyParser = require('body-parser');
var request = require('request');
var cheerio = require('cheerio');

// create a mongo db for articles, with headline, and link
var db = mongojs('huffPosts', ['articles']);

db.on('error', function(err) {
    console.log('Database Error:', err);
});
console.log(db);

// insert sample data
// db.collection.insert(docOrDocs, [callback])
// link: http://www.huffingtonpost.com/2013/05/29/samesies-video-gave-cavem_n_3352597.html?ir=Gay+Voices
// headline: ‘Samesies’: What’s Wrong With Gay Cavemen Procreating? (VIDEO)
function createSample() {
    var sample = {
        link: "http://www.huffingtonpost.com/2013/05/29/samesies-video-gave-cavem_n_3352597.html?ir=Gay+Voices",
        headline: "‘Samesies’: What’s Wrong With Gay Cavemen Procreating"
    };

    db.articles.insert(sample);
    db.articles.find(function(err, docs) {
        console.log(docs);
    });
}

function deleteSample() {
    db.articles.remove({
        link: "http://www.huffingtonpost.com/2013/05/29/samesies-video-gave-cavem_n_3352597.html?ir=Gay+Voices"
    });
}
// createSample();
// 

// app.use(bodyParser.urlencoded({
// 	extendd:false
// }));
// app.use(express.static('public'));

// app.get('/scrape', function(req, res){

request('http://www.huffingtonpost.com', function(err, response, html) {
    if (err) {
        throw err;
    }

    var $ = cheerio.load(html);
    var results = [];

    $('h2.card__headline.js-card-headline').each(function(index, element) {
        var title = ;
        var link = $(element).find('a').first().attr('href');

        results.push({
            title: title,
            link: link
        });
        // db.articles.find({title: $(element).text()}).
        // check if our database contains r
        // 
        // var bulk = db.articles.initializeOrderedBulkOp();

        // db.articles.insert({
        //     title: $(element).text(),
        //     link: $(element).find('a').first().attr('href')
        // });
        // db.articles.find(function(err, docs) {
        //     console.log(docs);
        // })
        // db.articles.insert(results);
    });
    // console.log('Here are your results:', results);

});
// when user goes to home
app.get('/', function(req, res) {
    // send the articles from db to browser (as json)
    db.articles.find(function(err, docs) {
        res.json(docs);
    })
});

// tell app to listen on 3000
app.listen(3000, function() {
    console.log('App running on port 3000!');
});

// });