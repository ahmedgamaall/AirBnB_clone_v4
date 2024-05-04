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
});