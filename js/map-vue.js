// All in Vue version of treat map

new Vue({
	el: '#app',
	data: { 
		map: null,
		tileLayer: null,
		markerList: null,
		layers: [
			{
				id: 0,
				name: 'Primary Entries',
				active: false,
				features: [
					{
					  id: 0,
					  name: 'amherst-college',
					  type: 'marker',
					  latitude: 42.371013,
					  longitude: -72.50,
					},
					{
					  id: 1,
					  name: 'residence-hitchcocks-amherst',
					  type: 'marker',
					  latitude: 42.368709,
					  longitude: -72.55,
					},
					{
					  id: 2,
					  name: 'appleton-cabinet',
					  type: 'marker',
					  latitude: 42.371505,
					  longitude: -72.6,
					},
				],
			},

		],
	},

	mounted() { 
		this.initMap();
		this.initLayers();
		this.addLayer();
	},

	methods: { 
		initMap() {

			this.map = L.map('mapdiv').setView([42.0, -72.6], 9);

			this.tileLayer = L.tileLayer(
			  'map/tiles/hitchcock1834/{z}/{x}/{y}.png',
			  {
		    	minZoom: 9,
			    maxZoom: 13,
			    tms: true,  // required by local hitchcock map, not carto etc.
			    attribution: 'Temp Hitchcock map'
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
					 	// goNext("holy");
					 	console.log(" - marker name: " + feature.name);

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

	}, // end methods
});
