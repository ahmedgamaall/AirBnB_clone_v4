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