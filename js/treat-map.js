// All in Vue version of treat map

Vue.component('journal-item', {
	// Prop variable name is touchy -- needs to be neither camelCase nor kebob-case
	props: ['anentry'],

	template: `
		<div class="map-scroll">
			<p><strong>{{ anentry.title }} </strong> </p>
			<img v-bind:src="'images/menupics/' + anentry.shortName + '.jpg'" />
			<span v-html="anentry.jrnText"></span>
		</div>
	`
})

var mapApp = new Vue({
	el: '#app',
	data: { 
		currIndex : 0,
		// map
		map: null,
		baseLayer: null,
		terrainLayer: null,
		greenleafLayer: null,
		roads: null,
		whichLayer: "greenleaf",
		roadsShowing: false,
		// need non-null intialization. Will be overwritten by 1st real data via initContent
		entry: {
					  ordinal: 0,
					  shortName: 'amherst-college',
					  zoomLevel: 10,
					  title: "Amherst College",
					  lat: 44,
					  lon: -69,
					  month: 'September',
					  day: '',
					  jrnText: "<p>[vue-data init - placeholder]</p>",
					},
		layers: [
			{
				id: 0,
				name: 'Primary Entries',
				active: false,
				features: [
					{
					  ordinal: 0,
					  shortName: 'intro',
					  zoomLevel: 8,
					  title: "Joseph Treat's Journal",
					  lat: 45,
					  lon: -68.767824,
					  month: 'September',
					  day: '16',
					  jrnText: "<p>Intro do the project.</p>"
					},
					{
					  ordinal: 1,
					  shortName: 'bangor',
					  zoomLevel: 9,
					  title: "Start - Bangor",
					  lat: 44.7971185,
					  lon: -68.767824,
					  month: 'September',
					  day: '',
					  jrnText: "<p>Bangor, 16th Sept. 1820</p><p>This day received Instructions from His Excellency William King, dated the 11th instant, directing me to preceed up the Penobscot...</p>"
					},
					{
					  ordinal: 2,
					  shortName: 'day-two',
					  zoomLevel: 10,
					  title: "First stop",
					  lat: 44.880163,
					  lon:  -68.659326,
					  month: 'September',
					  day: '',
					  jrnText: "<p>[Don't see a note on whether this is the same day, Sunday, as the first entry.]</p>",
					},
					{
					  ordinal: 70,
					  shortName: 'abol-falls',
					  zoomLevel: 10,
					  title: "Abolosokmasesick Falls",
					  lat: 45.82655,
					  lon:  -68.96821,
					  month: 'October',
					  day: '9',
					  jrnText: "<p>Lorem ipsum dolor sit amet consectetur adipiscing elit, semper nascetur phasellus himenaeos quis commodo, fermentum nisl elementum nunc etiam diam. Penatibus feugiat potenti ad interdum curae sodales hendrerit sociis eros semper, nibh auctor fermentum senectus ultrices ligula class fringilla sociosqu nunc tellus, aliquet magnis mattis lacus cum pretium praesent curabitur facilisis. Donec justo porttitor lacinia arcu ligula venenatis posuere erat pretium mauris sollicitudin per blandit congue convallis, tincidunt odio mattis tempor sagittis fames molestie nostra praesent pellentesque pulvinar primis lectus.<p></p> Suspendisse eget tellus justo hac ante nisl massa nam maecenas, lectus mus duis mi nullam porttitor habitasse rutrum torquent praesent, ac venenatis sociosqu montes nibh ad quisque suscipit. Tortor hendrerit fringilla lobortis penatibus aliquam varius nibh tempor scelerisque ante, bibendum duis curae venenatis porta suscipit leo luctus vulputate velit enim, blandit netus justo at cubilia hac senectus dui facilisi. Gravida congue dapibus feugiat nam dictum mollis nostra cursus, metus augue tempus ad sollicitudin curabitur sociosqu, felis lobortis praesent aptent erat netus interdum.</p>",
					},
					{
					  ordinal: 72,
					  shortName: 'neso-falls',
					  zoomLevel: 11,
					  title: "Nesowadnehunk Falls",
					  lat: 45.84633, 
					  lon:  -69.03056,
					  month: 'October',
					  day: '10',
					  jrnText: "<p>Lorem ipsum dolor sit amet consectetur adipiscing elit, semper nascetur phasellus himenaeos quis commodo, fermentum nisl elementum nunc etiam diam. Penatibus feugiat potenti ad interdum curae sodales hendrerit sociis eros semper, nibh auctor fermentum senectus ultrices ligula class fringilla sociosqu nunc tellus, aliquet magnis mattis lacus cum pretium praesent curabitur facilisis. Donec justo porttitor lacinia arcu ligula venenatis posuere erat pretium mauris sollicitudin per blandit congue convallis, tincidunt odio mattis tempor sagittis fames molestie nostra praesent pellentesque pulvinar primis lectus.<p></p> Suspendisse eget tellus justo hac ante nisl massa nam maecenas, lectus mus duis mi nullam porttitor habitasse rutrum torquent praesent, ac venenatis sociosqu montes nibh ad quisque suscipit. Tortor hendrerit fringilla lobortis penatibus aliquam varius nibh tempor scelerisque ante, bibendum duis curae venenatis porta suscipit leo luctus vulputate velit enim, blandit netus justo at cubilia hac senectus dui facilisi. Gravida congue dapibus feugiat nam dictum mollis nostra cursus, metus augue tempus ad sollicitudin curabitur sociosqu, felis lobortis praesent aptent erat netus interdum. </p>",
					},
					{
					  ordinal: 74,
					  shortName: 'neso-camp',
					  zoomLevel: 11,
					  title: "Remain in Camp",
					  lat: 45.84615, 
					  lon:  -69.03522,
					  month: 'October',
					  day: '11',
					  jrnText: "<p>Lorem ipsum dolor sit amet consectetur adipiscing elit, semper nascetur phasellus himenaeos quis commodo, fermentum nisl elementum nunc etiam diam. Penatibus feugiat potenti ad interdum curae sodales hendrerit sociis </p>",
					},
					{
					  ordinal: 76,
					  shortName: 'nolan-pond',
					  zoomLevel: 10,
					  title: "Nolangamick Pond",
					  lat: 45.87551,  
					  lon:  -69.12236,
					  month: 'October',
					  day: '12',
					  jrnText: "<p>Lorem ipsum dolor sit amet consectetur adipiscing elit, semper nascetur phasellus himenaeos quis commodo, fermentum nisl elementum nunc etiam diam. Penatibus feugiat potenti ad interdum curae sodales hendrerit sociis eros semper, nibh auctor fermentum senectus ultrices ligula class fringilla sociosqu nunc tellus, aliquet magnis mattis lacus cum pretium praesent curabitur facilisis. Donec justo porttitor lacinia arcu ligula venenatis posuere erat pretium mauris sollicitudin per blandit congue convallis, tincidunt odio mattis tempor sagittis fames molestie nostra praesent pellentesque pulvinar primis lectus.<p></p> Suspendisse eget tellus justo hac ante nisl massa nam maecenas, lectus mus duis mi nullam porttitor habitasse rutrum torquent praesent, ac venenatis sociosqu montes nibh ad quisque suscipit. Tortor hendrerit fringilla lobortis penatibus aliquam varius nibh tempor scelerisque ante, bibendum duis curae venenatis porta suscipit leo luctus vulputate velit enim, blandit netus justo at cubilia hac senectus dui facilisi. Gravida congue dapibus feugiat nam dictum mollis nostra cursus, metus augue tempus ad sollicitudin curabitur sociosqu, felis lobortis praesent aptent erat netus interdum. </p></p> Suspendisse eget tellus justo hac ante nisl massa nam maecenas, lectus mus duis mi nullam porttitor habitasse rutrum torquent praesent, ac venenatis sociosqu montes nibh ad quisque suscipit. Tortor hendrerit fringilla lobortis penatibus aliquam varius nibh tempor scelerisque ante, bibendum duis curae venenatis porta suscipit leo luctus vulputate velit enim, blandit netus justo at cubilia hac senectus dui facilisi. Gravida congue dapibus feugiat nam dictum mollis nostra cursus, metus augue tempus ad sollicitudin curabitur sociosqu, felis lobortis praesent aptent erat netus interdum. </p>",
					},
					{
					  ordinal: 80,
					  shortName: 'chee-inlet',
					  zoomLevel: 10,
					  title: "Cheesuncook Inlet",
					  lat: 46.052, 
					  lon:  -69.34847,
					  month: 'October',
					  day: '14',
					  jrnText: "<p>Lorem ipsum dolor sit amet consectetur adipiscing elit, semper nascetur phasellus himenaeos quis commodo, fermentum nisl elementum nunc etiam diam. Penatibus feugiat potenti ad interdum curae sodales hendrerit sociis eros semper, nibh auctor fermentum senectus ultrices ligula class fringilla sociosqu nunc tellus, aliquet magnis mattis lacus cum pretium praesent curabitur facilisis. Donec justo porttitor lacinia arcu ligula venenatis posuere erat pretium mauris sollicitudin per blandit congue convallis, tincidunt odio mattis tempor sagittis fames molestie nostra praesent pellentesque pulvinar primis lectus.<p></p> Suspendisse eget tellus justo hac ante nisl massa nam maecenas, lectus mus duis mi nullam porttitor habitasse rutrum torquent praesent, ac venenatis sociosqu montes nibh ad quisque suscipit. Tortor hendrerit fringilla lobortis penatibus aliquam varius nibh tempor scelerisque ante, bibendum duis curae venenatis porta suscipit leo luctus vulputate velit enim, blandit netus justo at cubilia hac senectus dui facilisi. Gravida congue dapibus feugiat nam dictum mollis nostra cursus, metus augue tempus ad sollicitudin curabitur sociosqu, felis lobortis praesent aptent erat netus interdum. </p>",
					},
					{
					  ordinal: 82,
					  shortName: 'umba-pond',
					  zoomLevel: 10,
					  title: "Umbazookskus Pond",
					  lat: 46.14653, 
					  lon:  -69.3497,
					  month: 'October',
					  day: '17',
					  jrnText: "<p>? </p>",
					},


					{
					  ordinal: 100,
					  shortName: 'amherst-college',
					  zoomLevel: 10,
					  title: "Mt. Katahdin",
					  lat: 45.9005,
					  lon:  -68.9256,
					  month: 'October',
					  day: '',
					  jrnText: "<p>Amherst College was founded in 1821 and is the third oldest college in Massachusetts. Edward Hitchcock was its third president and donated his huge collection of fossil tracks to the college where it can be seen today.</p>",
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

			this.map = L.map('mapdiv').setView([this.layers[0].features[0].lat, 
				this.layers[0].features[0].lon], 8);
			// this.map = L.map('mapdiv').setView([42.0, -72.6], 9);
			// // Base Layer
			// this.baseLayer = L.tileLayer(
			//   'https://api.mapbox.com/styles/v1/mapbox/donaldo/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZG9uYWxkbyIsImEiOiJjaWxjbTZ0eXIzNmh5dTJsemozOTRwbWViIn0.xB0UB2teNew30PzKpxHSDA',
			//   {
		 //    	minZoom: 7,
			//     maxZoom: 12,
			// 	attribution: 'Mapbox Don',		  }			
			// );
			// Terrain
			this.terrainLayer = L.tileLayer(
			  'https://stamen-tiles-{s}.a.ssl.fastly.net/terrain-'
				+ 'background/{z}/{x}/{y}.png',
			  {
		    	minZoom: 7,
			    maxZoom: 12,
				attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, '
						+ '<a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; '
						+ 'Map data &copy; ' 
						+ '<a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',		  }			
			);
			// Greenleaf 1815
			this.greenleafLayer = L.tileLayer(
			  // 'map/tiles/hitchcock1834/{z}/{x}/{y}.png',
			  'map/tiles/treat/{z}/{x}/{y}.png',
			  {
		    	minZoom: 7,
			    maxZoom: 12,
			    // tms: true,  // required by local hitchcock map, not carto etc.
			    attribution: 'Treat map'
			  }
			);
		    // Adding vector tiled roads via Tangram - layer parameters, source, etc... 
		    // are defined in scene.yaml file
		    this.roads = Tangram.leafletLayer({
		        // scene: '/static/js/map_assets/cinnabar-style.yaml',
		        scene: 'js/roads.yaml',
		        // scene: '/static/js/map_assets/scene.yaml',
		        attribution: '<a href="https://mapzen.com/tangram" target="_blank">Tangram</a> '
		        + '| &copy; OSM contributors | <a href="https://mapzen.com/" '
		        + 'target="_blank">Mapzen</a>',
				// bounds: mybounds,
				minZoom: 7,
				maxZoom: 12
		    }), 


			// this.baseLayer.addTo(this.map);

			this.greenleafLayer.addTo(this.map);

			// this.map.addLayer(this.roads);
			// this.roads.addTo(this.map);
		}, // end init map
		initLayers() {
			// // Old-school:
			// var a2 = a.map(function(s){ return s.length });

			// // ECMAscript 6 using arrow functions
			// var a3 = a.map( s => s.length );

			// Need to understand => and "this" better
			this.layers[0].features.forEach((feature, index) => {
			// this.layers[0].features.forEach(function(feature) {
				// console.log(" - lat: " + feature.lat); // feature.coords
				feature.hamObject = L.marker([feature.lat, feature.lon])
					.on("click", function(e) { 
					 	// console.log(" - marker name: " + feature.name);
					 	// mapApp.setEntry(feature.id, 10);
					 	mapApp.setEntry(index);
				});
			});
		},
		addLayer() {
			// Don't know why I have to add the features later, but it works.
			// this.layers[0].features.forEach(function(feature) {
			// Above doesn't work -- must be related to the "this" diff treatment
			this.layers[0].features.forEach((feature) => {
				// console.log(" -- fadd lon: " + feature.lon);
				feature.hamObject.addTo(this.map);
			});
		},
		incrementEntry: function(nextOrPrev) {
			if(nextOrPrev == 'next') {
				// Temp hard code zoom level - will eventually be in data.
				this.setEntry(this.currIndex + 1)
			} else {
				this.setEntry(this.currIndex - 1)
			}
		},
		setEntry: function(newEntIndex) {
			// Set the current journal entry index.
			this.currIndex = newEntIndex;

			// Update data to contain new journal entry
			// this.entry = siteListJson[this.currIndex];
			this.entry = this.layers[0].features[this.currIndex];
			// console.log(" - this.entry.name: " + this.entry.name);
			// Set the new map zoom location
			// Had big problems here with "this"-- scope issues "myApp" works
			mapApp.map.setView([
				this.entry.lat, 
				this.entry.lon
				], this.entry.zoomLevel) 
		},
		initContent: function() {
			// this.entry = siteListJson[0]
			this.entry = this.layers[0].features[0];
			// this.setEntry(0, 9)
		},
		layerChanged: function() {
			// console.log("- got to layerChanged: " + this.whichLayer);
			// whichLayer is changed by v-model and radio values
			if(this.whichLayer == "terrain") {
				this.greenleafLayer.removeFrom(this.map);
				this.terrainLayer.addTo(this.map);			
			} else {
				this.terrainLayer.removeFrom(this.map);
				this.greenleafLayer.addTo(this.map);			
			}
		},
		roadsChanged: function() {
			console.log("- got to roadsShowing: " + this.roadsShowing);
			// roadsShowing is changed by v-model and checkbox value
			// if(this.roadsShowing) {
			// 	// this.roads.addTo(this.map);	
			// 	this.map.addLayer(this.roads);	
			// 	this.roads.bringToFront();	
			// } else {
			// 	this.roads.removeFrom(this.map);
			// }
		},

	}, // end methods
});
