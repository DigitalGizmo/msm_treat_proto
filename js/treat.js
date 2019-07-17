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

	var siteListJson = [{"slug": "amherst-college", "title": "Amherst College", "map_blurb": "<p>Amherst College was founded in 1821 and is the third oldest college in Massachusetts. Edward Hitchcock was its third president and donated his huge collection of fossil tracks to the college where it can be seen today.</p>", "latitude": 42.371013, "longitude": -72.516445}, {"slug": "residence-hitchcocks-amherst", "title": "Amherst Home of the Hitchcocks", "map_blurb": "<p>The Hitchcocks lived in this house on South Pleasant street in Amherst until Edward was elected president, and to this house they returned, after resigning the presidency, to spend the remainder of their lives. The house was at first a plain building with no wings and a small porch in front. Between 1836 and 1840 Edward built the octagon as a place to work and to display his private collection.</p>", "latitude": 42.368709, "longitude": -72.520453}, {"slug": "appleton-cabinet", "title": "Appleton Cabinet", "map_blurb": "<p>Appleton Cabinet opened in 1855. It was constructed specifically to house the college&apos;s natural history collection, including Edward Hitchcock&apos;s collection of fossil &quot;bird tracks,&quot; now identified as dinosaur footprints. The building was later converted for academic use and currently is a dormitory. The beautiful geological collections are at the Beneski Museum, just down the hill on campus.</p>", "latitude": 42.371505, "longitude": -72.518131}, {"slug": "burial-silliman", "title": "Burial Site of Benjamin Silliman", "map_blurb": "<p>Benjamin Silliman is buried in the Grove Street Cemetery in New Haven, Connecticut.&nbsp;</p>", "latitude": 41.313764, "longitude": -72.92674}, {"slug": "burial-marsh", "title": "Burial Site of Dexter Marsh", "map_blurb": "<p>Dexer Marsh&apos;s gravestone in the small Federal Street Cemetery in Greenfield. He is buried between his two wives, Rebecca Slate and Eunice Everett. Two daughters are also buried with them.&nbsp;</p>", "latitude": 42.594515, "longitude": -72.597609}, {"slug": "burial-edward-hitchcock", "title": "Burial Site of Edward Hitchcock", "map_blurb": "<p>A photograph of the grave of Edward Hitchcock, located in West Cemetery in the center of town. The inscription says: &quot;Pastor in Conway / President and Prof. in Amherst College / A leader in science / A lover of men / A friend of God / Ever illustrating the cross in nature / And nature in the cross.&quot;&nbsp;</p><p>Orra&apos;s inscription on the side says: &quot;Daughter of Jarib and Ruth White / For 42 yrs wife of Edward Hitchcock&quot;</p><p>Emily Dickinson is buried in the Dickinson family plot just down the hill in the same cemetery.</p>", "latitude": 42.378916, "longitude": -72.518163}, {"slug": "burial-deane", "title": "Burial Site of James Deane", "map_blurb": "<p>The base of the obelisk grave stone of James Deane and his wife, daughters, and a sister in the Green River Cemetery. Behind the obelisk are the graves of Deane&apos;s mother and three siblings, who all died young. He had their graves moved from a country cemetery in Colrain soon after the opening of the Green River Cemetery in 1851. He may have been a founder, not an unusual role for physicians. It is an early example of the move away from church, village, and farm home lot burials to the modern park-like, landscaped cemetery.</p>", "latitude": 42.580613, "longitude": -72.604612}, {"slug": "northfield-farms", "title": "Burial Site of Roswell Field", "map_blurb": "<p>Roswell Field&apos;s tomb dominates the small, rural Northfield Farms Cemetery. He left $2,000 in his will for its purchase. It is of granite from the same quarry in Quincy, Mass., used for the Bunker Hill Monument in Charlestown, Mass., and proudly claims Field&apos;s place in discovering dinosaur footprints.</p>", "latitude": 42.612655, "longitude": -72.473873}, {"slug": "residence-hitchcock-deerfield", "title": "Childhood Home of Edward Hitchcock", "map_blurb": "<p>Exterior photo of the Hitchcock homestead in Deerfield, after restoration. Edward and his four older siblings lived here with their parents, Justin and Mercy Hitchcock. The home of Uncle &quot;Ep&quot; and Aunt &quot;Spiddy&quot; (Epaphras and Experience Hoyt) was just across the road. Edward&apos;s brother Henry inherited the house. Edward&apos;s eldest son, also named Edward, later recalled visits to his cousins during the 1830s and 1840s, when the boys slept in the attic and woke to find that snow had blown in through cracks in the walls during the night.</p>", "latitude": 42.542208, "longitude": -72.603385}, {"slug": "clay-hill", "title": "Clay Hill", "map_blurb": "<p>This is the earliest known photograph of Clay Hill in Greenfield, Massachusetts, taken in 1861 from Main Street, looking southeast. Many of the buildings in this picture were there when Dexter Marsh found the &quot;turkey tracks&quot; while laying sidewalk in 1835, probably in front of the buildings on the far side of the street.</p>", "latitude": 42.587101, "longitude": -72.600317}, {"slug": "da-memorial-hall", "title": "Deerfield Academy, now Memorial Hall", "map_blurb": "<p>Designed by the American-born architect Asher Benjamin, this was the first brick structure in Deerfield when it opened in 1799. The third story was soon added for boarding students. Edward and Orra Hitchcock met when teaching here between 1813-1818.&nbsp;</p><p>According to its first Preceptor, the Academy was &ldquo;an elegant Edifice, having, on the lower floor, four rooms, one for the English school, one for the Latin, &amp; Greek school, the Preceptor&apos;s room, and a room for the Museum and Library. The upper room, being all in one, is used for examinations, and exhibitions.&rdquo; A cabinet of shells, minerals and other objects engaged students in natural history, and a benefactor donated funds for top-of-the line astronomy equipment from London.&nbsp;</p>", "latitude": 42.544016, "longitude": -72.603022}, {"slug": "summit-house-mt-holyoke", "title": "Historic Mt. Holyoke Summit House", "map_blurb": "<p>The Summit House opened as a hotel in 1851. Its owners, the Frenches, built the first tramway in New England here in 1854, at first to transport hotel supplies, but soon used it as an attraction for hotel guests, who might take a ferry across the Connecticut River and then enjoy the steep, scenic tram ride to the top. Years later, the forward looking Frenches installed one of the first telephones in the area, more to amuse guests than to run the business.&nbsp;</p><p>The hotel was built long after Thomas Cole painted a view of the oxbow of the Connecticut River from Mount Holyoke, but the spot remained popular with artists in the 19th century.</p>", "latitude": 42.300461, "longitude": -72.587045}];

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
function getMyUrl(theURL) { //, contentDiv
	return $.ajax({
		url: theURL
	});
}

// Create array for site Markers and populate with json 
function setSites(siteListJson) {

	L.marker([42.0, -72.6]).bindPopup(popHtml).addTo(treatmap);

	console.log("siteListJson[0].slug: " + siteListJson[0].slug);

	// var siteLinks = '<ul class="map-sites">';
	// markerList = [];
	for (var i = 0; i < siteListJson.length; i++) {
		// create HTML for popup
		var popHtml = "<p><strong>" + siteListJson[i].title + "</strong> </p>" + 
			// don't know why, but src attribute needs to not be quoted
			"<img src=images/menupics/" + 
				siteListJson[i].slug  + ".jpg>" + siteListJson[i].map_blurb;
		// create marker, with popHtml
		// console.log(" --- siteListJson[i].latitude: " + siteListJson[i].latitude);	
		// make sure there's a valid lat and long
		// if (siteListJson[i].latitude && siteListJson[i].longitude) {
			// add marker
			// L.marker([51.49, -0.1], {icon: orangeIcon}).bindPopup("I am an orange leaf.").addTo(map);

			// This is the direct, non-array way.
			L.marker([siteListJson[i].latitude, 
				siteListJson[i].longitude]).bindPopup(popHtml).addTo(treatmap);

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
setMarkerLayer();
