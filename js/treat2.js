
// ------- temp navigation ----

$(document).on("click", "#next-item", function(event){

	// console.log(" -- got to pop item: ");

	// console.log("--- got to pop_item");
	event.preventDefault();
	// get href
	// use closest -- target may be image in dig deeper gallery
	// var chosen_href = $(event.target).closest('a').attr('href');
	var chosen_href = $(event.target).attr('href');

	goNext(chosen_href);

});


function goNext(chosen_href){

	console.log(" -- next: " + chosen_href);

	// Hard-wiring html for proof of concept. Eventually use Vue template.

	var content = "<p><strong>Historic Mt. Holyoke Summit House</strong> </p><img src='images/menupics/summit-house-mt-holyoke.jpg'><p>The Summit House opened as a hotel in 1851. Its owners, the Frenches, built the first tramway in New England here in 1854, at first to transport hotel supplies, but soon used it as an attraction for hotel guests, who might take a ferry across the Connecticut River and then enjoy the steep, scenic tram ride to the top. Years later, the forward looking Frenches installed one of the first telephones in the area, more to amuse guests than to run the business.&nbsp;</p><p>The hotel was built long after Thomas Cole painted a view of the oxbow of the Connecticut River from Mount Holyoke, but the spot remained popular with artists in the 19th century.</p>";

	$("#site_list").html(content);
	// now zoom and locate the marker
	// setView(lng, lat, zoom = zoom_level)
	// 42.300461, "longitude": -72.587045
	treatmap.setView([42.300461, -72.587045], 10);
}

$(document).on("click", "#prev-item", function(event){
	event.preventDefault();
	var chosen_href = $(event.target).attr('href');
	goPrev(chosen_href);
});

function goPrev(chosen_href) {
	console.log(" -- prev: " + chosen_href);

	var content = "<p><strong>Amherst Home of the Hitchcocks</strong> </p><img src='images/menupics/residence-hitchcocks-amherst.jpg'><p>The Hitchcocks lived in this house on South Pleasant street in Amherst until Edward was elected president, and to this house they returned, after resigning the presidency, to spend the remainder of their lives. The house was at first a plain building with no wings and a small porch in front. Between 1836 and 1840 Edward built the octagon as a place to work and to display his private collection.</p>";

	$("#site_list").html(content);
	treatmap.setView([42.368709, -72.520453], 10);
}



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
