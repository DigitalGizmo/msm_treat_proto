// All in Vue version of treat map
// Needed for $http.get
Vue.use(VueResource)

Vue.component('nav-block', {
	props: ['anentry'],
	methods: {
		cIncrementEntry: function(direction) {
			// console.log(" -- flip in component");
			this.$parent.incrementEntry(direction);
		},
	},
	template: `
		<nav class="entry-nav">
			<p>
				<template v-if="true" style="display: block;"> 
					<a href = "#" v-on:click.prevent = "cIncrementEntry('prev')">previous</a> | 
				</template>
				<a href = "#" v-on:click = "cIncrementEntry('next')">next</a>
			</p>
		</nav><!-- /entry-nav -->
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
		treatIcon: null,
		selectedIcon: null,
		markerList: [null], // indexed array for markers
		siteMarkers: null, // layer group
		imgname: null,
		isIntro: true,
		locatorOn: false,
		// JSON to be

		// entries: [{"title":"Joseph Init","slug":"intro","entry_date":"16 September, 1820",
		// "lat":45.0,"lon":-68.767824,"zoom_level":8,"is_flippable":false,
		// "entry_text":"<p>Introduction to the project.</p>"}],

		entries: [],

		// entry: null,
		entry: { slug: 'placeholder'},

	}, // end data

	created: function () {
		console.log('-- created')
		this.fetchData();
	},
	// Using callback from $http instead of mounted for inits
	// mounted() { },

	methods: { 

		fetchData: function () {
			// console.log('-- got to fetchData - init entries' + this.entries[0].title);
			// this.$http.get('http://127.0.0.1:8000/journal/entries/?format=json')
			let vm = this;
			this.$http.get('https://msm-treat-admin.digitalgizmo.com/journal/entries/?format=json')
					.then(response => {
						this.entries = response.data;
						console.log(" -- finished getting data?");
						vm.initAll();

					})
			console.log('-- after http get entries' ); // + this.entries[0].title
		},
		initAll() { 
			console.log('-- in initAll')
			this.initMap();
			this.initLayers();
			// this.addLayer();
			this.initContent();
		},
		getLocation: function(e) {
			// called by mouse click on map
			// if (e.shiftKey) { didn't work
			if (this.locatorOn) {
			    alert("Lat, Lon : " + e.latlng.lat.toFixed(4) + ", " + e.latlng.lng.toFixed(4));
			    // document.getElementById("app").style.cursor = "pointer";
				// this.isKeyPressed(e);
			} // else {	alert(" locator is off"); }
		},
		cursorTo: function (style) {
			console.log(" -- cursorTo " + style);
		    document.getElementById("mapdiv").style.cursor = style;
		},
		initMap() {
			// Create function for marker "center" offset.
			L.Map.prototype.setViewOffset = function (latlng, offset, targetZoom) {
			    var targetPoint = this.project(latlng, targetZoom).subtract(offset),
			    targetLatLng = this.unproject(targetPoint, targetZoom);
			    return this.setView(targetLatLng, targetZoom);
			}			

			// Define map
			// let latLng = L.latLng([this.layers[0].features[0].lat, 
			// 	this.layers[0].features[0].lon]);
			let latLng = L.latLng([this.entries[0].lat, 
				this.entries[0].lon]);

			// this.map = L.map('mapdiv').setView([this.layers[0].features[0].lat, 
			// 	this.layers[0].features[0].lon], 8);

			this.map = L.map('mapdiv').setView(latLng, 8);

			this.map.zoomControl.setPosition('bottomright');

			let offset = this.map.getSize().x*0.23;
			// console.log(" -- initial offset: " + offset);
			this.map.panBy(new L.Point(-offset, 0), {animate: false});
			// Prototype function doesn't work here, null
			// this.map = L.map('mapdiv').setViewOffset(latLng, [offset,0], 8);


			// // Base Layer
			// this.baseLayer = L.tileLayer(
			//   'https://api.mapbox.com/styles/v1/mapbox/donaldo/tiles/{z}/{x}/{y}
			//		?access_token=pk.eyJ1IjoiZG9uYWxkbyIsImEiOiJjaWxjbTZ0eXIz
			// 		Nmh5dTJsemozOTRwbWViIn0.xB0UB2teNew30PzKpxHSDA',
			//   {
			//     minZoom: 7,
			//     maxZoom: 12,
			// 	attribution: 'Mapbox Don',		  }			
			// );
			// Terrain
			this.terrainLayer = L.tileLayer(
			  'https://stamen-tiles-{s}.a.ssl.fastly.net/terrain-'
				+ 'background/{z}/{x}/{y}.png',
			  {
		    	minZoom: 7,
			    maxZoom: 11,
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
			    maxZoom: 11,
			    tms: true,  // required by local hitchcock map, not carto etc.
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
				maxZoom: 11
		    });

			// this.baseLayer.addTo(this.map);

			this.greenleafLayer.addTo(this.map);

		    // Add path
		    // console.log("-- treat path: " + treatPathGeoJ.type);
		    // this.treatPath = new L.GeoJSON(treatPathGeoJ);
			function linestyle(feature) {
				return {
					weight: 2,
					opacity: 1,
					dashArray: (8, 7),
					color: '#bd4219',  //Outline color
				};
			}
		    this.treatPath = new L.GeoJSON(treatPathGeoJ, {style: linestyle});
			this.treatPath.addTo(this.map);

			// this.map.addLayer(this.roads);
			// this.roads.addTo(this.map);

			// Show lat and long on click.
			// The event sent is a leaflet event, not directly
			// meaningful to Vue. But I don't know how to handle
			// a shiftKey modifier or "state" variable in leaflet land,
			// so I'm sending the event to the Vue instance, from 
			// "outside" of Vue, as it were -- that's why I can't use .this.
			this.map.on('click', function(e) {
				mapApp.getLocation(e);
			});			


		}, // end init map
		initLayers() {
			// custom marker
			this.treatIcon = L.icon({
				iconUrl: 'js/images/treat-marker-icon-2x.png',
				shadowUrl: 'js/images/marker-shadow.png',
				iconSize:     [25, 41], // size of the icon
				shadowSize:   [40, 54], // size of the shadow
				iconAnchor:   [15, 54], // point of the icon which will correspond to marker's location
				shadowAnchor: [4, 62],  // the same for the shadow
				popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
			});
			this.selectedIcon = L.icon({
				iconUrl: 'js/images/hilite-treat-marker-icon-2x.png',
				shadowUrl: 'js/images/marker-shadow.png',
				iconSize:     [25, 41], // size of the icon
				shadowSize:   [40, 54], // size of the shadow
				iconAnchor:   [15, 54], // point of the icon which will correspond to marker's location
				shadowAnchor: [4, 62],  // the same for the shadow
				popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
			});

			// // Old-school:
			// var a2 = a.map(function(s){ return s.length });

			// // ECMAscript 6 using arrow functions
			// var a3 = a.map( s => s.length );

			// Store markers in array so they can be access by index
			this.markerList = [];
			// Add link to attribute the source for this
			// Need to understand => and "this" better
			// this.layers[0].features.forEach((feature, index) => {


			console.log(" -- pre loop entries, length: " + this.entries.length);

			this.entries.forEach((feature, index) => {
			// this.layers[0].features.forEach(function(feature) {
				// console.log(" - lat: " + feature.lat); // feature.coords
				this.markerList.push(L.marker([feature.lat, feature.lon], {icon: this.treatIcon})
					.on("click", function(e) { 
					 	// console.log(" - marker name: " + feature.name);
					 	// mapApp.clearHighlights();

					 	// feature.markerObject.setIcon(mapApp.selectedIcon);


					 	// mapApp.setEntry(feature.id, 10);
					 	mapApp.setEntry(index);
					}) 	// end pm click
				); // end push

				this.markerList[index].addTo(this.map);


			}); // end forEach

			// this.siteMarkers = L.layerGroup(this.markerList);

		}, // end initLayers
		clearHighlights(){
			// this.layers[0].features.forEach((feature) => {
			// 	feature.markerObject.setIcon(this.treatIcon);
			// });
			this.markerList.forEach((item, index) => {
				// console.log(" -- fadd lon: " + feature.lon);
				item.setIcon(this.treatIcon);

				// // use css instead??
				// // Don't know why, but we seem to need to reinstate the pointer as
				// // mouseover behaviour. (Otherwise reverts to grab cursor)
				// item.on("mouseover", function(e) {
				//     document.getElementById('mapdiv').style.cursor = "pointer";
				// }).on("mouseout", function(e) {
				//     document.getElementById('mapdiv').style.cursor = "grab";
				// });


			});

		},
		goIntro: function() {
			this.isIntro = true;
			this.setEntry(0);
		},
		incrementEntry: function(nextOrPrev) {
			// In case of click from intro
			// this.isIntro = false;
			// In any case
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
			this.entry = this.entries[this.currIndex];

			// console.log(" - this.entry.name: " + this.entry.name);

			// Update imageShortName independently -- used for flipImage
			this.imgname = this.entry.slug;
			console.log(" -- imgname: " + this.imgname);

			this.clearHighlights();

			if(this.currIndex > 0) {
				// Since this not (or no longer) intro:
				this.isIntro = false;
				// Highlight the marker (here instead of as a function of the marker itself)
				this.markerList[newEntIndex].setIcon(mapApp.selectedIcon);
			} else { // this is intro, hide marker
				// this.markerList[newEntIndex].setIcon(mapApp.selectedIcon);
			}

			// Set the new map zoom location
			// Had big problems here with "this"-- scope issues "myApp" works
			// Need to offset "center"
			let offset = mapApp.map.getSize().x*0.23;
			console.log(" -- offset: " + offset);

			let latLng = L.latLng([this.entry.lat, 
				this.entry.lon]);

			// console.log("-- in setEntry, pre setView, zoom_level: " + this.entry.zoom_level);
			// mapApp.map.setView(latLng, this.entry.zoom_level);
			mapApp.map.setViewOffset(latLng,[offset,0],this.entry.zoom_level)

		},
		initContent: function() {
			// this.entry = siteListJson[0]


			console.log("-- first title: " + this.entries[0].title);

			// this.entry = this.layers[0].features[0];
			this.entry = this.entries[0];


			// image set independently for flipImage
			this.imgname = this.entry.slug;
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
		// locatorChanged: function() {
		// 	if(this.whichLayer == "terrain") {
		// 		this.greenleafLayer.removeFrom(this.map);
		// 		this.terrainLayer.addTo(this.map);			
		// 	} else {
		// 		this.terrainLayer.removeFrom(this.map);
		// 		this.greenleafLayer.addTo(this.map);			
		// 	}
		// },
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
		flipDrawing: function() {
			// console.log(" -- flippable name ending: " + 
			// this.imgname.substring(this.imgname.length - 5, this.imgname.length));
			if (this.imgname.substring(this.imgname.length - 5, this.imgname.length) == "_down") {
				// ends with _down
				// console.log(" -- trimmed name: " + this.imgname.substring(0, this.imgname.length - 5));
				this.imgname = this.imgname.substring(0, this.imgname.length - 5);
			} else {
				// doesn't end with _down
				this.imgname = this.imgname + "_down";
			}
			// console.log(" -- flip new name: " + this.imgname);
		},

	}, // end methods
});
