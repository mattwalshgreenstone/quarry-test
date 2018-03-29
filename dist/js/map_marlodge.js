(function(window, document, undefined){

//define infobox selection
var infobox = d3.select('#info');

//define contents of info box
var info = {
    loc: d3.select('#info .loc'), //.info is the class in the html
    pc: d3.select('#info .pc'),
  };

 var mappic = d3.select('#mappic');
 
	var make_map = (function(data){


		var radius_scale = function(data){
			return d3.scale.linear().domain([0, d3.max(data, function(d){return d.mag;})]).range([1, 15]);
		}

		var color_scale = function(data){
			return d3.scale.linear().domain([0, d3.max(data, function(d){return d.colour;})]).range(['#FA3AB6', '#663AAA']);
			
		}

		var map = L.map('map_leaflet', {
            zoomControl:false, //we have to remove the standard one to put in our new one where we want
            }).setView([56.992281 , -3.485215], 8); //start point and zoom to mar lodge
        
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
		  })	

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
   					d3.select('.loc').transition().delay(200).attr("href", d.hyperlink).text(d.name); //hyperlink  & name
   					info.pc.transition().delay(200).text('' + d.infotext); //change text

   					d3.select('.extra').transition().delay(200).attr("href", d.hyperlink2).text(d.hypertext); 

	        		mappic.transition().delay(200).attr("src", 'mapimages/' + d.imagefile); //put image in
	        		   		
        			//Fade up again after short time
        			setTimeout(function() {
        		    infobox.transition().duration(500).style("opacity", "1");},230);//this is the timer time
        	});
   			   			

		map.on("viewreset", update);
		update();

		//hide info boxes on map click
	
		map.on("dblclick", function(d){
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
	d3.csv('data/marlodge.csv',function(csv){		
		make_map(csv);
	});

      
})(this, document);