// JavaScript script that is executed only when DOM is loaded
// Uses JQuery

let checkedBox = {};

$(document).ready(function () {
	$('input:checkbox').change(function () {
		let id = $(this).data('id');
		let name = $(this).data('name');

		if ($(this).prop('checked')) {
			checkedBox[id] = name;
		} else {
			delete checkedBox[id];
		}

		$('div.amenities h4').html(function () {
			let amenities = Object.values(checkedBox);
			if (amenities.length === 0) {
				return '&nbsp;';
			} else {
				return amenities.join(', ');
			}
		});
	});
	const apiStatus = $('DIV#api_status');
	$.ajax('http://0.0.0.0:5001/api/v1/status/').done(function (data) {
		if (data.status === 'OK') {
			apiStatus.addClass('available');
		} else {
			apiStatus.removeClass('available');
		}
	});
});

$.ajax({
	type: 'POST',
	url: 'http://0.0.0.0:5001/api/v1/places_search/',
	contentType: 'application/json',
	data: '{}',
	success: function (data) {
		for (let currPlace of data) {
			$('.places').append('<article> <div class="title"> <h2>' + currPlace.name + '</h2><div class="price_by_night">' + '$' + currPlace.price_by_night + '</div></div> <div class="information"> <div class="max_guest"> <i class="fa fa -users fa-3x" aria-hidden="true"></i><br />' + currPlace.max_guest + ' Guests</div><div class="number_rooms"> <i class="fa fa -users fa-3x" aria-hidden="true"></i><br />' + currPlace.number_rooms + ' Bedrooms</div><div class="number_bathrooms"> <i class="fa fa -users fa-3x" aria-hidden="true"></i><br />' + currPlace.number_bathrooms + ' Bathroom </div></div> <div class="user"></div><div class="description">' + '$' + currPlace.description + '</div></article>');
		}
	}
});