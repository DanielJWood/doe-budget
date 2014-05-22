var marker = new Array();


    for (var i = 0; i < points.length; i++) {
     //create a the "iconic" url for the icon, from the mapbox api.
    
     
     //cap = cap + points[i].properties.cum_cap;
     
      var iconic

//can set iconic = to something here.

    // if (points[i].properties.OPERATING_YEAR === cur_year) {
    //     iconic = '/sites/prod/files/point.png'
    // } else if (points[i].properties.OPERATING_YEAR >= 2010 ) {iconic = '/sites/prod/files/recent.png'}
    //   else if (points[i].properties.OPERATING_YEAR >= 2000 ) {iconic = '/sites/prod/files/00s.png'}
    //   else if (points[i].properties.OPERATING_YEAR >= 1990 ) {iconic = '/sites/prod/files/90s.png'}
    //   else if (points[i].properties.OPERATING_YEAR >= 1970 ) {iconic = '/sites/prod/files/80s.png'}


      // Create custom popup content
       
      /*pushing items into array each by each and then add markers*/
      var LamMarker = new L.marker([points[i].geometry.coordinates[1],points[i].geometry.coordinates[0]], {
        icon: L.icon({
            iconUrl: '80s.png',
            iconSize:     [9, 9], // size of the icon
            iconAnchor:   [4, 4], // point of the icon which will correspond to marker's location
            popupAnchor:  [1, -13]  // point from which the popup should open relative to the iconAnchor
            })
        });
          marker.push(LamMarker);
          map.addLayer(marker[i].bindPopup('<p class="labs_text">' + points[i].properties.facility + '</p>').openPopup());

    };


// var popup = L.popup()
//   .setLatLng([40, -100])
//   .setContent('<p>Hello world!<br />This is a nice popup.</p>')
//   .openOn(map);