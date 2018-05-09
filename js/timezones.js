
$(document).ready(function() {




  //========================================================
  //timezone calcs
  //========================================================
  var timezonegroups = _.groupBy(members, function(member) {
    return member.timezone;
  });


  var alltimes = Object.keys(timezonegroups);
  var firstzone = Math.min.apply(Math, alltimes)
  var lastzone = Math.max.apply(Math, alltimes)
  var divisions = lastzone - firstzone

  console.log( alltimes );
  console.log( firstzone );
  console.log( lastzone );
  console.log( divisions );

  

















  






      
});

