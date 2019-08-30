// All in Vue version of treat map

new Vue({
	el: '#app',
	data: { 
		map: null,
		tileLayer: null,
		layers: [
			{
				id: 0,
				name: 'Sites of Entries',
				active: false,
				features: [
					{
					  id: 0,
					  name: 'amherst-college',
					  type: 'marker',
					  coords: [42.371013, -72.50],
					},
					{
					  id: 1,
					  name: 'residence-hitchcocks-amherst',
					  type: 'marker',
					  coords: [42.368709, -72.55],
					},
					{
					  id: 2,
					  name: 'appleton-cabinet',
					  type: 'marker',
					  coords: [42.371505, -72.6],
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
			this.layers.forEach((layer) => {
				// Initialize the layer
				const markerFeatures = layer.features.filter(feature => feature.type === 'marker');

				markerFeatures.forEach((feature) => {
				  feature.leafletObject = L.marker(feature.coords)
				    .bindPopup(feature.name);
				});

			});

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
