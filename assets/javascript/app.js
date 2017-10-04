$(document).on('click', '.gifBtn', function() {
	var topic = $(this).html().toLowerCase()
	var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=pSvUDSHn1V72RSC1EDTUOu4zVU9QdqG3&limit=10"
	$.ajax({
		url: queryUrl,
		method: 'GET',
	}).done(function(response) {
		console.log(response)
		for (var i = 0; i < 10; i++) {
			var gif = $("<div>")
			var animate = response.data[i].images.fixed_height.url
			var still = response.data[i].images.fixed_height_still.url
			gif.html("<p>Rating: "+ response.data[i].rating.toUpperCase() + "</p><img data-state='animate' data-animate=" +animate+ " data-still=" +still+ " src=" + animate + " class=gif>")
			gif.css("float", "left")
			gif.css("margin", "10px 10px")
			$("#gifs").prepend(gif)
		}
	})
})

$('#addBtn').on('click', function(event) {
	event.preventDefault()
	var text = $("#addBtnText").val()
	$("#addBtnText").val("")
	var newBtn = $("<button>")
	newBtn.attr("class", "gifBtn")
	newBtn.css("margin-right", "3px")
	newBtn.html(text)
	$("#btns").append(newBtn)
})

$(document).on('click', '.gif', function() {
	console.log($(this).attr('data-state'))
	if ($(this).attr('data-state') === 'animate') {
		$(this).attr('data-state', 'still')
		console.log($(this).attr('data-state'))
		$(this).attr('src', $(this).attr('data-still'))
	} else {
		$(this).attr('data-state', 'animate')
		$(this).attr('src', $(this).attr('data-animate'))
	}
})