"use strict"


// ---------- MAP ----------

var treatmap;
// var markerList = []; // on a level with map, markers can be accessed by index

var impBounds = [
	[40.55, -74], // southWest
	[44, -71.5] // northEast
];

var impMaxBounds = [
	[41.18, -73.43],
	[43.4, -71.82]
];

// Define layer to be added later.
var hitchcock1834   = L.tileLayer('map/tiles/hitchcock1834/{z}/{x}/{y}.png', {
	attribution: 'Hitchcock map',
	// bounds: mybounds, //tempbounds
	minZoom: 9,
	maxZoom: 13,
	//opacity: .7,
    tms: true
});

// Define base layer.
// var stamen = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain-'
// 	+ 'background/{z}/{x}/{y}.{ext}', {
// 	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, '
// 	+ '<a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; '
// 	+ 'Map data &copy; ' 
// 	+ '<a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
// 	subdomains: 'abcd',
// 	// bounds: mybounds,
// 	bounds: impBounds,
// 	minZoom: 9,
// 	maxZoom: 13,
// 	ext: 'png'
// });

// ----- set map -----
treatmap = L.map('mapdiv', {
	center: [42.0, -72.6], // -72.45
	zoom: 9, // 9
	maxBounds: impMaxBounds,
	maxBoundsViscosity: 0.5,
	//layers: [streets, markerList]
	// layers: [mapLayerObjects[layerIndex]] //, siteMarkers hitchcock
	// layers: [stamen] // topobase stamen , siteMarkers hitchcock
	layers: [hitchcock1834] // topobase stamen , siteMarkers hitchcock
});

// -------- markers --------

// var firstMarker = L.marker([42.0, -72.6]).addTo(treatmap);

// // firstMarker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
// firstMarker.bindPopup("<b>Hello world!</b><br>I am a popup.").addTo(treatmap);

// Try marker loop.
function setMarkerLayer() {

	// siteListJson is defined in separate file

	setSites(siteListJson);


	// // Get local file.
	// // Get ansynchronous data via a "promise" per 
	// // http://stackoverflow.com/questions/5316697/jquery-return-data-after-ajax-call-success
	// // siteListPromise is a jqXHR object
	// var siteListPromise = getMyUrl("map/sites/history.json");
	// // var siteListPromise = getMyUrl("https://dinotracksdiscovery.org/map/sites/history/");

	// // This is triggered when we get the json site list back (data)
	// // siteListPromise.success(function (data) {
	// // Success method depricated in jquery 3.0. use "done" instead.
	// siteListPromise.done(function (data) {

	// 	// console.log(" -- data: " + data);

	// 	// var siteListJson = $.parseJSON( data );
	// 	// Slice off "-- data: ".
	// 	// var siteListJson = data.substring(4);
	// 	// var siteListJson = data.toString();
	// 	var siteListJson = $.parseJSON( data.toString() );
	// 	// var siteListJson = data;

	// 	// console.log(" -- json: " + siteListJson);
	// 	setSites(siteListJson);

	// });
}

// jQuery Ajax
// Need to set up call to ajax asynchronously. Use promise per 
// http://stackoverflow.com/questions/5316697/jquery-return-data-after-ajax-call-success
// function getMyUrl(theURL) { //, contentDiv
// 	return $.ajax({
// 		url: theURL
// 	});
// }

// Create array for site Markers and populate with json 
function setSites(siteListJson) {

	// L.marker([42.0, -72.6]).bindPopup(popHtml).addTo(treatmap);
	L.marker([42.0, -72.6]).bindPopup().addTo(treatmap);

	console.log("siteListJson[0].slug: " + siteListJson[0].slug);

	// var siteLinks = '<ul class="map-sites">';
	// markerList = [];
	for (var i = 0; i < siteListJson.length; i++) {

		// create HTML for popup
		// var popHtml = "<p><strong>" + siteListJson[i].title + "</strong> </p>" + 
		// 	// don't know why, but src attribute needs to not be quoted
		// 	"<img src=images/menupics/" + 
		// 		siteListJson[i].slug  + ".jpg>" + siteListJson[i].map_blurb;


		// create marker, with popHtml
		// console.log(" --- siteListJson[i].latitude: " + siteListJson[i].latitude);	
		// make sure there's a valid lat and long
		// if (siteListJson[i].latitude && siteListJson[i].longitude) {
			// add marker
			// L.marker([51.49, -0.1], {icon: orangeIcon}).bindPopup("I am an orange leaf.").addTo(map);

			// This is the direct, non-array way.
			L.marker([siteListJson[i].latitude, 
				siteListJson[i].longitude]).addTo(treatmap).on("click", function(e) {
				  goNext("holy");
				});
				// siteListJson[i].longitude]).bindPopup(popHtml).addTo(treatmap).on('click', goNext);
				// siteListJson[i].longitude]).bindPopup().addTo(treatmap).on('click', goNext);
				// siteListJson[i].longitude]).addTo(treatmap).on('click', goNext);
				// L.marker([42.76, 20.52],[...]).on("click", function(e) {
				//   circleClick(e, parameter1, parameter2);
				// });
			// We're creating the array so that we have an index in order to pop it up
			// custom markers:   ..siteListJson[i].longitude], {icon: greenIcon}).bindPopup(popHtml));
			// markerList.push(L.marker([siteListJson[i].latitude, 
			// 	siteListJson[i].longitude]).bindPopup(popHtml));

			// add to HTML for site list links
	// 		siteLinks += '<li><a class="site_link" href="' + i + '">' +
	// 			siteListJson[i].title + "</a></li>" 
	// 	} else {
	// 		siteLinks += '<li>' + siteListJson[i].title + " (missing lat, long)</li>" // site_info.title		
	// 	}
	} // end for 
	// siteLinks += "</ul>";

	// set site links for sidebar
	// $('#site_list').html(siteLinks);

	// now that list is in place add event listener
	// Set click action on the links
	// $(".site_link").on('click', function(event) {
	//     event.preventDefault(); 

	//     var markerIndex = $(event.target).attr('href');
	//     console.log("---- link on site_list works: " + markerIndex);
	//     // openPopUpFromSide(markerIndex)
	//  });
}

// function openPopUpFromSide(markerIndex) {
// 	// console.log("got to open popup. markerIndex: " + markerIndex);
// 	markerList[markerIndex].openPopup();
// }




// Intitalize by setting markers.
// siteListJson is defined in separate file

setSites(siteListJson);

// ---- VUE ---
// "use strict"

var currEntIndex = 0

var jrnEntry = new Vue({
	el: "#site_list",
	data: {
		entry       : "",
		message1	: " well then",
		title		: "title",
		mapBlurb   : "blurb",
		entImage   : "temp"
	}
})

// imagify returns the corresponding emoji image
function imagify(slug) {
  var out = `<img src="images/menupics/` + slug + `.jpg">`
  return out
}


console.log("siteListJson[0].slug: " + siteListJson[0].slug);
// jrnEntry.entry = jrnEntry.hitch

jrnEntry.entry = siteListJson[currEntIndex]
goToEntry(currEntIndex, 9);


// ------- temp navigation ----

$(document).on("click", "#next-item", function(event){
	// console.log("--- got to next-item");
	event.preventDefault();
	currEntIndex += 1
	// goNext(chosen_href);
	goToEntry(currEntIndex, 10);
});


$(document).on("click", "#prev-item", function(event){
	event.preventDefault();
	// var chosen_href = $(event.target).attr('href');
	currEntIndex -= 1
	// goPrev(chosen_href);
	goToEntry(currEntIndex, 10);
});

function goToEntry(currEntIndex, zoomLevel){
	console.log(" -- currEntIndex: " + currEntIndex);
	jrnEntry.entry = siteListJson[currEntIndex];
	jrnEntry.message1 = siteListJson[currEntIndex].slug;
	jrnEntry.title = siteListJson[currEntIndex].title;
	jrnEntry.mapBlurb = siteListJson[currEntIndex].map_blurb;
	jrnEntry.entImage = imagify(siteListJson[currEntIndex].slug);
	// jrnEntry.entry = siteListJson[3]
	console.log(" -- slug: " + siteListJson[currEntIndex].slug);

	// treatmap.setView([
	// 	jrnEntry.entry = siteListJson[currEntIndex].latitude, 
	// 	jrnEntry.entry = siteListJson[currEntIndex].longitude
	// 	], 10)

	treatmap.setView([
		siteListJson[currEntIndex].latitude, 
		siteListJson[currEntIndex].longitude
		], zoomLevel)
}

// test

var app2 = new Vue({
	el: "#app2",
	data: {
		message: "Whello Don"
	}
}
)
