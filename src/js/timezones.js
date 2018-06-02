
window.onload = function () {


  //========================================================
  // This computers timezone (UTC offset)
  //========================================================

  var userHours = -(new Date().getTimezoneOffset() / 60)
  var userZone = new Date().toString().split(" ");
  var timeZoneFormatted = userZone[userZone.length - 2] + " " + userZone[userZone.length - 1];
  var timeZoneArea = new Date().toString().match(/\(([A-Za-z\s].*)\)/)[1];

  //========================================================
  //Member timezone calcs
  //========================================================
  var timeZoneGroups = _.groupBy(members, function(member) {
    return member.utcOffset;    
  });


  //all times zones with people in
  var allTimes = Object.keys(timeZoneGroups)
  //earliest timezone
  var firstZone = Math.min.apply(Math, allTimes)
  //latest timezone
  var lastZone = Math.max.apply(Math, allTimes)
  //number of timezones between earliest + latest
  var divisions = lastZone - firstZone + 1;

  //create blocks for each time zone
  var zoneWrap = document.getElementById("timezone-wrap");

  //define text for ID names
  var allZones = "";
  var zoneIDprefix = "zonenum-";
  var zonePeoplePrefix = "zone-p-";
  

  //Create enough timezone dics  
  for (var i = 0; i < divisions; i++) {
    var zoneNum = i + firstZone - userHours;
    
    //set text for heading
    var zoneText = zoneNum;
    
    if ( zoneText == 0 ) { 
      zoneText = "Your timezone"; 
      areaCode = "(" + timeZoneArea + ")";
    }
    if ( zoneText > 0 ) { 
      zoneText = "+" + zoneText;
      areaCode = "";
    }
    if ( zoneText < 0 ) { 
      areaCode = "";
    }

    //Set template for timezone divs
    var oneZone = 
      '<div class="zonewrap empty" id="' + (zoneIDprefix + zoneNum)
      + '">' 
        + '<h2>' + zoneText + ' <span class="subzoneText">' + areaCode + '</span>'  + '</h2>'
        + '<div class="zone-ppl" id="' + (zonePeoplePrefix + zoneNum) + '"></div>'
      + '</div>';
   

    allZones = allZones + oneZone;
  }

  //Create in DOM
  zoneWrap.innerHTML = allZones;

  //for each timezone in allTimes
  for (var i = 0; i < allTimes.length; i++) {

      var allZonePeople = "";
      var currentZone = allTimes[i];
      var currentZoneAdjusted = currentZone - userHours;
      var zoneSelector = zonePeoplePrefix + currentZoneAdjusted;
      var wrapSelector = zoneIDprefix + currentZoneAdjusted;
      var zonePeople = timeZoneGroups[currentZone]

      //for each person in timezone
      for (var j = 0; j < zonePeople.length; j++) {
        
          var thisPerson = zonePeople[j];
          var thisZoneID = zoneIDprefix + j

          var onePerson = 
          '<div class="zone-p-wrap">'
            + '<img src="img/people/' + thisPerson.imagefile + '"alt="profile-pic"></img>'
            + '<div class="p-name-wrap"><h4>' + thisPerson.name + '</h4></div>'
          + '</div>'

          allZonePeople = allZonePeople + onePerson;
          
      }

      //push people html to inside zone
      document.getElementById(zoneSelector).innerHTML = allZonePeople;
      //remove empty class from zone wrap
      document.getElementById(wrapSelector).classList = "zonewrap"

  }



  








  






      
};

