// grab the articles as a json
// grab the articles as a json
$.getJSON('/articles', function(data) {
  // for each one
  for (var i = 0; i<data.length; i++){
  	$("#articles").append('<p data-id="' + data[i]._id + '">'+ data[i].title + '<br />'+ data[i].link + '</p>'); //********
  }
});


$(document).on('click', 'p', function(){

$("#comments").empty();

$.ajax({
    method: "GET",
    url: "/articles/"+ thisId,
  })

	.done(function(data){
		console.log(data);

	$('#comments').append('<h2>') + data.title + '</h2>';
	$('#comments').append('<input id= "titleInput" name="title">')
	$('#comments').append('<textarea id="bodyInput" name="body"></textarea>');
	$('#comments').append('button data-id="'+ data._id + '" id="saveComment">Save Comment</button>')
	//if there is a comment
		if(data.comment){
			$('#titleInput').val(data.comment.title);
			$('#bodyInput').val(data.comment.body);

		}

	})
})