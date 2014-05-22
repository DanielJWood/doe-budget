

		var map = L.map('map', {
			scrollWheelZoom: false
		}).fitBounds([
            [42.461, -56.979],[32.536, -134.4]
            ]);

		var cloudmade = L.tileLayer("http://a.tiles.mapbox.com/v3/energy.map-461t6jk2/{z}/{x}/{y}.png", {
			//attribution: 'Map data &copy; 2011 OpenStreetMap contributors, Imagery &copy; 2011 CloudMade',
			//key: 'BC9A493B41014CAABB98F0471D759707',
			//styleId: 22677
		}).addTo(map);


		// control that shows state info on hover
		var info = L.control();

		info.onAdd = function (map) {
			this._div = L.DomUtil.create('div', 'info');
			this.update();
			return this._div;
		};

		info.update = function (props) {
			this._div.innerHTML = '<h4>DOE funding in 2012</h4>' +  (props ?
				'<b>' + props.name + ': $' + props.finalpoint
				: 'Click on a state');
		};

		info.addTo(map);




		// get color depending on population density value
		function getColor(d) {
			return d > 1000000000   ? '#A10341' :
			       d > 500000000    ? '#AE275C' :
			       d > 100000000 	 ? '#BB4B77' :
			       d > 50000000 	 ? '#C96F92' :
			       d > 10000000  	 ? '#D693AD' :
			       d > 0	   	 ? '#E4B7C8' :
			                  	   '#F1DBE3' ;
		}

		function style(feature) {
			return {
				weight: 1,
				opacity: 1,
				color: 'white',
				dashArray: '10,5',
				fillOpacity: 0.7,
				fillColor: getColor(feature.properties.datapoint[0])
			};
		}

		function highlightFeature(e) {
			var layer = e.target;
			
			//If you scroll over active layer, don't highlight
			if (layer != activedom) {
				layer.setStyle({				
					fillOpacity: 0.7,
					weight: 7,
				opacity: 1,
				color: 'white',
				dashArray: '1,12'
				});
			};

			if (!L.Browser.ie && !L.Browser.opera) {
				layer.bringToFront();
			}

			//info.update(layer.feature.properties);
		}

		var geojson;
		var activeid;
		var activedom;

		function moveState(e) {
			//this if statement resets style unless your thing is selected.
			if (e.target._leaflet_id != activeid) {

				geojson.resetStyle(e.target);

			}

			//info.update();   //Get's rid of update when leave state

		}

		function onClickfirst(geojson) {
			geojson.resetStyle();
		} 

		function onClicky(e) {

			//this clears the current highlighting on click, if there is something already highlighted.
			if (activedom != undefined) {
				activedom.setStyle({
					weight: 1,
					dashArray: '3',
					fillOpacity: '0.7'
				});
			}; 

			var layer = e.target;
			
			activeid = layer._leaflet_id;
			
			//define next active dom to carry through to next loop
			activedom = layer;

			layer.setStyle({
				weight: 7,
				opacity: 1,
				color: 'white',
				dashArray: '1,12'
			});

			info.update(layer.feature.properties);

			map.fitBounds(e.target.getBounds());

		}

		function onEachFeature(feature, layer) {
			layer.on({
				click: onClicky

			});
			

			layer.on({
				mouseover: highlightFeature,
				mouseout: moveState,
				click: onClickyhigh
			});
		}

		geojson = L.geoJson(statesData, {
			style: style,
			onEachFeature: onEachFeature
		}).addTo(map);

		//map.attributionControl.addAttribution('Population data &copy; <a href="http://census.gov/">US Census Bureau</a>');


		var legend = L.control({position: 'bottomright'});

		legend.onAdd = function (map) {

			var div = L.DomUtil.create('div', 'info legendz'),
				grades = [0, 10000000, 50000000, 100000000, 500000000, 1000000000],
				grades2 = [0, '10,000,000', '50,000,000', '100,000,000', '500,000,000', '1,000,000,000'],
				labels = [],
				from, from2, to2;

			for (var i = 0; i < grades.length; i++) {
				from = grades[i];
				to = grades[i + 1];
				from2 = grades2[i];
				to2 = grades2[i + 1];

				labels.push(
					'<i style="background:' + getColor(from + 0.1) + '"></i> $' +
					from2 + (to2 ? '&ndash; $' + to2 : '+'));
			}

			div.innerHTML = labels.join('<br>');
			return div;
		};

		legend.addTo(map);

