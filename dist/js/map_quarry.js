(function(window, document, undefined){

	//define infobox selection
	var infobox = d3.select('#info');

	//define contents of info box
	var green1 = '#46d9b1';
	var green2 = '#2dc0b6';

	//define contents of info box
	var info = {
			picture: d3.select('#info #profile-pic'),
			name: d3.select('#info #profile-name'),
			role: d3.select('#info #role'),
			location: d3.select('#info #location'),
			startdate: d3.select('#info #startdate'),
			linkedin: d3.select('#info #linkedin')
	  };

	 
	var make_map = (function(data){

		var radius_scale = function(data){
			return d3.scale.linear().domain([0, d3.max(data, function(d){return d.mag;})]).range([1, 15]);
		}

		var color_scale = function(data){
			return d3.scale.linear().domain([0, d3.max(data, function(d){return d.colour;})]).range([ green1, green2 ]);
		}

		var map = L.map('map_leaflet', {
	          zoomControl:false, //we have to remove the standard one to put in our new one where we want
	          }).setView([36.000000 , -100.000000], 4); //start point and zoom to mar lodge
	      
	  var mapLink = 
	      '<a href="http://openstreetmap.org">OpenStreetMap</a>';
	  L.tileLayer(
	      'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	      minZoom:2
	      }).addTo(map);

		//add new zoom controls
	  //new L.Control.Zoom({ position: 'topright' }).addTo(map);

	  // Initialize the SVG layer
		map._initPathRoot() 

		// We pick up the SVG from the map object
		var svg = d3.select("#map_leaflet").select("svg"),
		g = svg.append("g");	

		data.forEach(function(entry) {
		   entry.LatLng = new L.LatLng(entry.lat,
		      entry.long)
		 });

		var radius = radius_scale(data);
		var color = color_scale(data);
			
					  
		var feature = g.selectAll("circle")
		  .data(data)
		  .enter().append("circle")
		  .style("stroke", "white")  
		  .style("opacity", .8) 
		  .style("fill", function(d){ return color(d.colour);}) 
		  .attr("r", function(d){ return radius(d.mag);})
		  .attr("class", "location_circle")
		  //fade in on mouseover
	 		.on("click", function(d){
				  				
				infobox.transition().duration(200).style("opacity", "0") //faceout anything already open
					.style("display", "block");//make sure display isnt set to none

					//refill box after old boxes have been hidden  
					info.picture.transition().delay(200).attr("src", 'img/people/' + d.imagefile); //put image in
					info.name.transition().delay(200).text(d.name);
					info.role.transition().delay(200).text(d.role);
					info.location.transition().delay(200).text(d.location);
					info.startdate.transition().delay(200).text(d.startdate);
					info.linkedin.transition().delay(200).attr("href", 'https://' + d.linkedin).text(d.linkedin); 
	    		   		
	  		//Fade up again after short time
	  		setTimeout(function() {
	  		  infobox.transition().duration(500).style("opacity", "1");
	  		},230);//this is the timer time

	  	});
	  	//END ON CLICK
	   			   			

			map.on("viewreset", update);
			update();

			//hide info boxes on map dbl click
			map.on("dblclick", function(d){
				infobox.transition().duration(600).style("opacity", "0");
				infobox.transition().delay(600).style("display", "none");
	   	 }); 

			// click box to close
	 	 	infobox.on("click", function(d){
	 	 		infobox.transition().duration(600).style("opacity", "0");
				infobox.transition().delay(600).style("display", "none");
	 	 	});
			

			function update() {
		   	feature.attr("transform", 
		   	function(d) { 
		       	return "translate("+ 
		    	map.latLngToLayerPoint(d.LatLng).x +","+ 
		    	map.latLngToLayerPoint(d.LatLng).y +")";
		    })
			}
			
	});
	//END MAKE MAP

	d3.csv('data/quarrydata.csv',function(csv){		
		make_map(csv);
	});

      
})(this, document);