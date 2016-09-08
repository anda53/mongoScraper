var mongoose = require("mongoose");

//make schema class
var Schema = mongoose.Schema;


var ArticleSchema= new Schema({

	title: {
		type:String,
		required: true
	},
	article: {
		type:String,
		required: true
	},
	link: String,
	required:true

})







var Article = mongoose.model('Article', ArticleSchema);

// export the model
module.exports = Article;