// All in Vue version of treat map

Vue.component('journal-item', {
	// Prop variable name is touchy -- needs to be neither camelCase nor kebob-case
	props: ['anentry'],

	template: `
		<div class="map-scroll">
			<p><strong>{{ anentry.title }} </strong> </p>
			<img v-bind:src="'images/menupics/' + anentry.name + '.jpg'" />
			<span v-html="anentry.map_blurb"></span>
		</div>
	`
})

var mapApp = new Vue({
	el: '#app',
	data: { 
		currIndex : 0,
		// map
		map: null,
		tileLayer: null,
		// need non-null intialization. Will be overwritten by 1st real data via initContent
		entry: {
					  id: 0,
					  name: 'amherst-college',
					  type: 'marker',
					  title: "Amherst College",
					  latitude: 44,
					  longitude: -69,
					  map_blurb: "<p>[vue-data init - placeholder]</p>",
					},
		layers: [
			{
				id: 0,
				name: 'Primary Entries',
				active: false,
				features: [
					{
					  id: 0,
					  name: 'appleton-cabinet',
					  type: 'marker',
					  title: "Start",
					  latitude: 45,
					  longitude: -68.9524,
					  map_blurb: "<p>[vue-data]: Appleton Cabinet opened in 1855. It was constructed specifically to house the college&apos;s natural history collection, including Edward Hitchcock&apos;s collection of fossil &quot;bird tracks,&quot; now identified as dinosaur footprints. The building was later converted for academic use and currently is a dormitory. The beautiful geological collections are at the Beneski Museum, just down the hill on campus.</p>"
					},
					{
					  id: 1,
					  name: 'amherst-college',
					  type: 'marker',
					  title: "Mt. Katahdin",
					  latitude: 45.9005,
					  longitude:  -68.9256,
					  map_blurb: "<p>Amherst College was founded in 1821 and is the third oldest college in Massachusetts. Edward Hitchcock was its third president and donated his huge collection of fossil tracks to the college where it can be seen today.</p>",
					},
					{
					  id: 2,
					  name: 'residence-hitchcocks-amherst',
					  type: 'marker',
					  title: "Penobscot River",
					  latitude: 45.9498,
					  longitude: -69.1892,
					  map_blurb: "<p>The Hitchcocks lived in this house on South Pleasant street in Amherst until Edward was elected president, and to this house they returned, after resigning the presidency, to spend the remainder of their lives. The house was at first a plain building with no wings and a small porch in front. Between 1836 and 1840 Edward built the octagon as a place to work and to display his private collection.</p>",
					},
				], // end features
			}, // end first layer
		], // end layers
	}, // end data

	mounted() { 
		this.initMap();
		this.initLayers();
		this.addLayer();
		this.initContent();
	},

	methods: { 
		initMap() {

			this.map = L.map('mapdiv').setView([this.layers[0].features[0].latitude, -68.9524], 8);

			this.tileLayer = L.tileLayer(
			  // 'map/tiles/hitchcock1834/{z}/{x}/{y}.png',
			  'map/tiles/treat/{z}/{x}/{y}.png',
			  {
		    	minZoom: 7,
			    maxZoom: 12,
			    // tms: true,  // required by local hitchcock map, not carto etc.
			    attribution: 'Treat map'
			  }
			);
			this.tileLayer.addTo(this.map);
		},
		initLayers() {
			// // Old-school:
			// var a2 = a.map(function(s){ return s.length });

			// // ECMAscript 6 using arrow functions
			// var a3 = a.map( s => s.length );

			// Need to understand => and "this" better
			this.layers[0].features.forEach((feature) => {
			// this.layers[0].features.forEach(function(feature) {
				// console.log(" - lat: " + feature.latitude); // feature.coords
				feature.hamObject = L.marker([feature.latitude, feature.longitude])
					.on("click", function(e) { 
					 	// console.log(" - marker name: " + feature.name);
					 	mapApp.setEntry(feature.id, 10);
				});
			});
		},
		addLayer() {
			// Don't know why I have to add the features later, but it works.
			// this.layers[0].features.forEach(function(feature) {
			// Above doesn't work -- must be related to the "this" diff treatment
			this.layers[0].features.forEach((feature) => {
				// console.log(" -- fadd longitude: " + feature.longitude);
				feature.hamObject.addTo(this.map);
			});
		},
		incrementEntry: function(nextOrPrev) {
			if(nextOrPrev == 'next') {
				// Temp hard code zoom level - will eventually be in data.
				this.setEntry(this.currIndex + 1, 10)
			} else {
				this.setEntry(this.currIndex - 1, 10)
			}
		},
		setEntry: function(newEntIndex, zoomLevel) {
			// Set the current journal entry index.
			this.currIndex = newEntIndex;

			// Update data to contain new journal entry
			// this.entry = siteListJson[this.currIndex];
			this.entry = this.layers[0].features[this.currIndex];
			// console.log(" - this.entry.name: " + this.entry.name);
			// Set the new map zoom location
			// Had big problems here with "this"-- scope issues "myApp" works
			mapApp.map.setView([
				this.entry.latitude, 
				this.entry.longitude
				], zoomLevel) 
		},
		initContent: function() {
			// this.entry = siteListJson[0]
			this.entry = this.layers[0].features[0];
			// this.setEntry(0, 9)
		},

	}, // end methods
});
