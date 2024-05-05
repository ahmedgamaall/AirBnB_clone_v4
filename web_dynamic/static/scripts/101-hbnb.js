// JavaScript script that is executed only when DOM is loaded
// Uses JQuery

let checkBoxAmenities = {};
let checkBoxStates = {};
let checkBoxCities = {};
let checkBoxLocations = {};

$(".checkboxState").click(function () {
  if ($(this).prop("checked")) {
    checkBoxStates[$(this).attr("data-id")] = $(this).attr("data-name");
  } else if (!$(this).prop("checked")) {
    delete checkBoxStates[$(this).attr("data-id")];
  }
  if (
    Object.keys(checkBoxStates).length === 0 &&
    Object.keys(checkBoxCities).length === 0
  ) {
    $(".locations h4").html("&nbsp;");
  } else {
    $(".locations h4").text(
      Object.values(checkBoxStates)
        .concat(Object.values(checkBoxCities))
        .join(", ")
    );
  }
});

$(".checkboxCity").click(function () {
  if ($(this).prop("checked")) {
    checkBoxCities[$(this).attr("data-id")] = $(this).attr("data-name");
  } else if (!$(this).prop("checked")) {
    delete checkBoxCities[$(this).attr("data-id")];
  }
  if (
    Object.keys(checkBoxStates).length === 0 &&
    Object.keys(checkBoxCities).length === 0
  ) {
    $(".locations h4").html("&nbsp;");
  } else {
    $(".locations h4").text(
      Object.values(checkBoxCities)
        .concat(Object.values(checkBoxStates))
        .join(", ")
    );
  }
});

$(document).ready(function () {
  $("input:checkbox").change(function () {
    let id = $(this).data("id");
    let name = $(this).data("name");

    if ($(this).prop("checked")) {
      checkBoxAmenities[id] = name;
    } else {
      delete checkBoxAmenities[id];
    }

    $("div.amenities h4").html(function () {
      let amenities = Object.values(checkBoxAmenities);
      if (amenities.length === 0) {
        return "&nbsp;";
      } else {
        return amenities.join(", ");
      }
    });
  });

  const apiStatus = $("DIV#api_status");
  $.ajax("http://0.0.0.0:5001/api/v1/status/").done(function (data) {
    if (data.status === "OK") {
      apiStatus.addClass("available");
    } else {
      apiStatus.removeClass("available");
    }
  });

  $("button").click(function () {
    $.ajax({
      type: "POST",
      url: "http://0.0.0.0:5001/api/v1/places_search/",
      contentType: "application/json",
      data: JSON.stringify({
        amenities: Object.keys(checkBoxAmenities),
        states: Object.keys(checkBoxStates),
        cities: Object.keys(checkBoxCities),
      }),
      success: function (data) {
        for (let currPlace of data) {
          $(".places").append(
            '<article> <div class="title"> <h2>' +
              currPlace.name +
              '</h2><div class="price_by_night">' +
              "$" +
              currPlace.price_by_night +
              '</div></div> <div class="information"> <div class="max_guest"> <i class="fa fa -users fa-3x" aria-hidden="true"></i><br />' +
              currPlace.max_guest +
              ' Guests</div><div class="number_rooms"> <i class="fa fa -users fa-3x" aria-hidden="true"></i><br />' +
              currPlace.number_rooms +
              ' Bedrooms</div><div class="number_bathrooms"> <i class="fa fa -users fa-3x" aria-hidden="true"></i><br />' +
              currPlace.number_bathrooms +
              ' Bathroom </div></div> <div class="user"></div><div class="description">' +
              "$" +
              currPlace.description +
              "</div></article>"
          );
        }
      },
    });
  });
});
