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


			this.markerList = [];

			// this.layers[0].features.forEach((feature) => {
			this.layers[0].features.forEach(function(feature) {

				console.log(" - lat: " + feature.latitude); // feature.coords
				feature.leafletObject = L.marker([feature.latitude, feature.longitude])
					.bindPopup(feature.name);
				// // feature.leafletObject.addTo(this.map);

				// // This is the direct, non-array way.
				// L.marker([feature.latitude, 
				// 	feature.longitude]).addTo(this.map).on("click", function(e) {
				// 	  // goNext("holy");
				// 	  console.log(" -- clicked marker");
				// 	});



				// this.markerList.push(L.marker([feature.latitude, 
				// 	 feature.longitude]).addTo(this.map).on("click", function(e) { 
				// 	 	// goNext("holy");
				// 	 	console.log(" - marker index: " + i);
				// 	 	// v-on:click = "incrementEntry('next')"

				// 	 	// Prop need all code in vue for this to work
				// 	 	// jrnEntry.setEntry(i, 10);

				// 	 	// Temporarily this works, prob because it's not defined until afer siteListJson is defined
				// 	 	// jrnEntry.incrementEntry('next');

				// 	 })
					
				// );

			});
			// siteMarkers = L.layerGroup(markerList);
			// siteMarkers.addTo(treatmap);

		},
		layerChanged(layerId, active) { 
			const layer = this.layers.find(layer => layer.id === layerId);

			layer.features.forEach((feature) => {
			  /* Show or hide the feature depending on the active argument */

				if (active) {
				  feature.leafletObject.addTo(this.map);
				} else {
				  feature.leafletObject.removeFrom(this.map);
				}

			});
		},

	},
});
