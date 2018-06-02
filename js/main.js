
$(document).ready(function() {

  var wrapper = document.getElementById('wrapper');
  var header = document.getElementById('header');
  var filterSection = document.getElementById('filter-section');
  var filter = 'none';
  var searchbox = document.getElementById('searchbox');
  var clearsearch = $('#clear-search');



  //========================================================
  // SEARCH
  //========================================================

  //creates a listener for when you press a key
  window.onkeyup = keyup;
  var searchText;

  function keyup(e) { 
    //perform search
    performSearch( searchText )
  }
  

  function  performSearch( searchText ) {

    //get input text for every key press
    searchText = searchbox.value.toLowerCase();

    var results = [];
    
    for ( var i=0; i < members.length; i++ ) {
      for ( key in members[i] ) {
        //only search text fields
        if ( typeof members[i][key] == "string" ) {
            //convert to lower case  
            if ( members[i][key].toLowerCase().indexOf( searchText )!=-1 ) {
              results.push( members[i] );
              break;
            }
        }
      }
    } //end for loop
    make_cards( results );

  }

  // CLEAR SEARCH
  clearsearch.click( function(event) {
    searchbox.value = "";
    make_cards( members );
  });


  //========================================================
  //FILTERING
  //========================================================

  //fill up filters
  var allRoles = []
  var filterCode = '';
  //get all roles
  members.forEach(function(entry) { allRoles.push(entry.role) });

  //filter for ones more than 1 of
  var roleFilters = GetPopular(allRoles);

  //sort alphabetically
  roleFilters.sort((a, b) => a.localeCompare(b))
  //create DOM item for each (removing empty ones)
  roleFilters.forEach( function(role) {
    if ( role !== '-') {
        var filterItem = '<div id="filter-' + role + '" class="filter">' + role + '</div>'
        filterCode = filterCode + filterItem;
    }
  
  }); 

  //add to DOM
  $('#filter-wrap').html(filterCode);

  

  $('.filter').click( function(event) {

    // fill text box with text
    searchbox.value = event.target.textContent;
    performSearch( searchText )

  });


  //========================================================
  //USEFUL FUNCTIONS
  //========================================================

  function GetUnique( inputArray )
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

  function GetPopular( inputArray ) {

    //set min value
    var moreThan = 3;

    var o = inputArray.reduce((o, n) => {
      n in o ? o[n] += 1 : o[n] = 1;
      return o;
    }, {});

    var outputArray = Object.keys(o).filter(k => o[k] > moreThan);


    return outputArray;
  }



  //========================================================
  //MAKING CARDS
  //========================================================

  var make_cards = (function( data ){
    //clear html content variable
    var quarryPeople = "";  
    
    data.forEach(function( entry ) {

        // Add people to collection
          //create template
        var person = 
        '<div class="info-card">'
          + '<img id="profile-pic" class="profile-img" src="img/people/' + entry.imagefile + '" alt="profile-pic"></img>'
          + '<div class="card-text">' 
            + '<h2 class="profile-name">' + entry.name + '</h2>'
            + '<h5>Department</h5><h3 class="role">' + entry.role + '</h3>'
            + '<h5>Location</h5><h3 id="location">' + entry.location + '</h3>';

          if (entry.linkedin != '') {
            person = person + '<a class= "linkedin-wrap" href="' + entry.linkedin +  '" target="blank"> <img src="img/icons/linkedin.svg" alt=""></a>'
          };

          person = person + '</div>'
          + '</div>'
        ;
          //add to collection
        quarryPeople = quarryPeople + person;
        
     });

    //push array of people to DOM
    $('#card-wrap').html( quarryPeople );
        

      
  });
  //END MAKE CARDS



  //========================================================
  // WRAPPER PADDING
  //========================================================

  $( window ).resize(function() {
    setWrapperTop()
  })

  var setWrapperTop = function() {
    var offset =  filterSection.offsetHeight + header.offsetHeight;
    wrapper.style.setProperty("top", offset + "px");
    wrapper.style.setProperty("height", "calc(100% - " + offset +  "px)")
  }



  

  //========================================================
  //FIRST PAGE RUN
  //========================================================
  setWrapperTop();
  make_cards(members);




      
});

