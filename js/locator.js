// ---------- MAP ----------

// Define base layer.
const stamen = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain'
	// + 'background/{z}/{x}/{y}.{ext}', {
	+ '/{z}/{x}/{y}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, '
	+ '<a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; '
	+ 'Map data &copy; ' 
	+ '<a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	subdomains: 'abcd',
	ext: 'png'
});

// // ----- define historic overlay ----- 
// const sanborn   = L.tileLayer('tiles/sanborn/{z}/{x}/{y}.png', {
// 	attribution: 'Sanborn map',
// 	// bounds: mybounds, //tempbounds
// 	minZoom: 15,
// 	maxZoom: 18,
// 	//opacity: .7,
//     tms: true
// })


// ----- set map -----
// regular map setting
const urmap = L.map('mapdiv', {
	center: [44, -69], // -72.45
	zoom: 9, // 9
	layers: [stamen] // topobase stamen , siteMarkers hitchcock // , block_layer
});

// Show lat and long on click
urmap.on('click', function(e) {
    alert("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng)
});			


// function addSanborn() {
// 	if (!urmap.hasLayer(sanborn)) {
// 		urmap.addLayer(sanborn);
// 	}
// 	// Since State was first on it will be last to leave in reverse
// 	if (urmap.hasLayer(districtState)) {
// 		urmap.removeLayer(districtState);
// 	}
// }




