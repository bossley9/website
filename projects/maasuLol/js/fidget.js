
//Created by Sam Bossley. All Rights Reserved. Copyright 2017.






//declare all global variables we will be using in this "plugin" so we don't get any errors or null exceptions
click = false; //boolean on whether the user is clicking
xOld = 0; //first coordinate x-value
yOld = 0; //first coordinate y-value

xNew = 0; //second coordinate x-value
yNew = 0; //second coordinate y-value

//timing functions for calculating the velocity of the mouse movements
TimerOneSet = setInterval( function() {}, 500);
TimerTwoSet = setInterval( function() {}, 100);

var clickCheck = function (e) {
  click = true;

  console.log('click');

  //Detects and updates the coordinates of point 1
  TimerOneSet = setInterval( function () {
    xOld = e.clientX;
    yOld = e.clientY;
  }, 500);

};

var clickOff = function (e) {
  click = false;
  console.log('offclick');

  clearInterval(TimerOneSet);
  clearInterval(TimerTwoSet);
};

var Spin = function (e) {
  if (!click) return false;

  if (click) {

    //Detects and updates the coordinates of point 2
    TimerTwoSet = setInterval( function () {
      xNew = e.clientX;
      yNew = e.clientY;
    }, 100);
  
  }
}

//Only the mousedown and touchstart events specify an element (getElementById) because it doesn't matter where the user lets go of his mouse or moves his mouse after he clicks, it only matters where he starts to click (in this case, the fidget spinner element.)
document.getElementById('maasu-fidget-svg').addEventListener('mousedown', clickCheck);
document.getElementById('maasu-fidget-svg').addEventListener('touchstart', clickCheck);

document.addEventListener('mouseup', clickOff);
document.addEventListener('touchend', clickOff);

document.addEventListener('mousemove', Spin);
document.addEventListener('touchmove', Spin);

