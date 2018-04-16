
$(document).ready(function() {

	var wrapper = $('#wrapper')
	var filter = 'none';


	//========================================================
	//FILTERING
	//========================================================

	//fill up filters
	var allRoles = []
	var filterCode = '';
	//get all roles
	members.forEach(function(entry) { allRoles.push(entry.role) })
	//filter for unique ones
	var roleFilters = GetUnique(allRoles);
	//create DOM item for each
	roleFilters.forEach( function(role) {
		if ( role !== '-') {
				var filterItem = '<div id="filter-' + role + '" class="filter">' + role + '</div>'
				filterCode = filterCode + filterItem;
		}
	
	});	

	//add to DOM
	$('#filter-wrap').html(filterCode);

	

	$('.filter').click( function(event) {
			//turn all filters off
			$('.filter').not(this).removeClass('js-on')

			// turn this one on
			$( this ).toggleClass('js-on');

			if ( filter !== $(this).text() ) {
					filter = $(this).text();

					var filteredMembers = $.grep(members, function (member, i) {
						return member.role == filter;
					});

					make_cards(filteredMembers);
			}
			else {
					filter = 'none'
					make_cards(members);
			}
	});


	//========================================================
	//USEFUL FUNCTIONS
	//========================================================

	function GetUnique(inputArray)
	{
		var outputArray = [];
		for (var i = 0; i < inputArray.length; i++)
		{
			if ((jQuery.inArray(inputArray[i], outputArray)) == -1)
			{
				outputArray.push(inputArray[i]);
			}
		}
		return outputArray;
	}





	//========================================================
	//MAKING CARDS
	//========================================================

	var make_cards = (function(data){
		//clear html content variable
		var quarryPeople = "";	
		
		data.forEach(function(entry) {

				// Add people to collection
					//create template
				var person = 
				'<div class="info-card">'
				 	+ '<img id="profile-pic" class="profile-img" src="img/people/' + entry.imagefile + '" alt="profile-pic"></img>'
					+ '<div class="card-text">' 
						+ '<h2 class="profile-name">' + entry.name + '</h2>'
						+ '<h5>Role</h5><h3 class="role">' + entry.role + '</h3>'
						+ '<h5>Location</h5><h3 id="location">' + entry.location + '</h3>';

					if (entry.linkedin != '') {
						person = person	+ '<a class= "linkedin-wrap" href="' + entry.linkedin +  '" target="blank"> <img src="img/icons/linkedin.svg" alt=""></a>'
					};

					person = person + '</div>'
					+ '</div>'
				;
					//add to collection
	 			quarryPeople = quarryPeople + person;
				
		 });

		//push array of people to DOM
		$('#card-wrap').html(quarryPeople);
				

			
	});
	//END MAKE CARDS


	//========================================================
	//FIRST PAGE RUN
	//========================================================
	make_cards(members);




      
});

