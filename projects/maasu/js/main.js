
// COUNTDOWN FUNCTION

// conference date
conferenceDate = '03/23/2018';
function initializeDaysLeft(id, date) {
  var clock = document.getElementById(id);

  var timeCounter = setInterval( function () {
    var t = Date.parse(date) - Date.parse(new Date());
    var daysLeft = Math.floor( t/(1000*60*60*24) );
    var seconds = Math.floor( (t/1000) % 60 );

    clock.innerHTML = daysLeft + ' days left!';
    
    if ( t <= 0 ) {
      clearInterval(timeCounter);
      clock.innerHTML = '0 days left!';
    }
  
  }, 1000);
}

initializeDaysLeft('countdown', conferenceDate);
