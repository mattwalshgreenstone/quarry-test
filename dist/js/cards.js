(function(window, document, undefined){

	var wrapper = d3.select('#wrapper')
	var filter = 'none';

	$('#filter-role').click( function(event) {

		$( this ).toggleClass('js-on');

		if (filter == 'none') {
			filter = 'UX'
		}
		else if (filter == 'UX') { filter = 'none' }

		d3.csv('data/quarrydata.csv',function(csv){		
			make_cards(csv);
		});

	});




	var make_cards = (function(data){

		var quarryPeople = "";	
		
		data.forEach(function(entry) {

				//if matched filter

				if (filter != 'none') {
					if ( entry.role  == filter ) {
						addPerson(entry);
					}
				} else {
					addPerson(entry);
				}

				

				function addPerson(entry) {
					var person = 
					'<div class="info-card">'
					 	+ '<img id="profile-pic" class="profile-img" src="img/people/' + entry.imagefile + '" alt="profile-pic"></img>'
						+ '<h2 class="profile-name">' + entry.name + '</h2>'
						+ '<h5>Role</h5><h3 class="role">' + entry.role + '</h3>'
						+ '<h5>Location</h5><h3 id="location">' + entry.location + '</h3>'
						+ '<h5>At Green Stone</h5><h3 id="startdate">' + entry.startdate + '</h3>' 
						+ '<h5>LinkedIn</h5><a id="linkedin" target="blank" href="' + entry.linkedin +  '">' + entry.linkedin + '</a>'
					+ '</div>'
					;

		 			quarryPeople = quarryPeople + person;
				}
				

		 });

			//push array of dog names to html
			document.getElementById('card-wrap').innerHTML = quarryPeople;
				

			
	});
	//END MAKE CARDS

	d3.csv('data/quarrydata.csv',function(csv){		
		make_cards(csv);
	});

      
})(this, document);