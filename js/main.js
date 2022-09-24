/*
 * Copyright Sam Bossley 2016. All rights reserved.
 */

//GOOGLE ANALYTICS
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-105760053-2', 'auto');
ga('send', 'pageview');


//LOADING PAGE
function Loaded() {
    document.getElementById('loader').style.opacity = 0;
    setTimeout( function () {
        document.getElementById('loader').style.display = "none";
    }, 500);

    
    document.addEventListener('touchstart', lightspeed_mobile);
    document.addEventListener('touchend', groundspeed);
    document.addEventListener('touchmove', modulusfinder_mobile); 

    document.addEventListener('mousedown', lightspeed);
    document.addEventListener('mouseup', groundspeed);
    document.addEventListener('mousemove', modulusfinder); 
}

function animate(elem, unit, from, to, time) {
    if( !elem) return;
    var start = new Date().getTime(),
    timer = setInterval(function() {
        var step = Math.min(1,(new Date().getTime()-start)/time);
        elem.innerHTML = Math.round(from+step*(to-from))+unit;
        if( step == 1 ) {
            clearInterval(timer);
            window.setTimeout( function () {
                Loaded();
            }, 500 );
        }
    },25);
    elem.innerHTML = Math.round(from)+unit;
}

function LoadMe() {
    animate(document.getElementById('progress'), "%", 0, 100, 2000);
}

window.addEventListener ? 
window.addEventListener("load", LoadMe, false) : 
window.attachEvent && window.attachEvent("onload", LoadMe);

//ATTEMPTED EXTRA REFINING FOR FIREFOX (GECKO) BROWSERS
var Firefox = (document.getBoxObjectFor != null || window.mozInnerScreenX != null);
if (Firefox) {
    document.getElementById("modulus").style.display = 'none';
}

//INITIALIZING JS FOR JS USERS
document.documentElement.className = document.documentElement.className.replace( /(?:^|\s)no-js(?!\S)/g , '' );
document.getElementById('startTag').innerHTML = "Click/Tap and Hold";
document.getElementById('portal').style.position = "fixed";
document.getElementById('portal').style.zIndex = "1";

//ENTER MAIN CONTENT
var x = 100; var ticker;
function Hyperspace() {
    clearInterval(ticker);    
    document.removeEventListener('touchstart', lightspeed_mobile);
    document.removeEventListener('touchend', groundspeed);
    document.removeEventListener('touchmove', modulusfinder_mobile); 

    document.removeEventListener('mousedown', lightspeed);
    document.removeEventListener('mouseup', groundspeed);
    document.removeEventListener('mousemove', modulusfinder); 
    document.getElementById('modulus').style.visibility = "hidden";
    
    document.getElementById('backdropGateway').style.backgroundSize = "100%";
    document.getElementById('portal').style.opacity = "0";

    setTimeout( function() {
        document.getElementById('portal').style.display = "none";
        document.body.style.overflowY = "scroll";
    }, 400);
}

// TAP AND CLICK (HOLD) EVENT LISTENERS
function breakthrough(event) {
    document.getElementById('startTag').style.visibility = "hidden";
    document.getElementById('modulus').style.visibility = "visible";
    
    clearInterval(ticker);    
    if ( x > 100 ) x = 100;
    ticker = setInterval(function(){
        x--;
        
        if ((Math.abs(100 - x)/100*38) > 38) {
            document.getElementById('modulus-loader').style.r = "38px"; 
        } else {
            document.getElementById('modulus-loader').style.r = Math.round(Math.abs(100 - x)/100*38)  + "px"; 
        }
        document.getElementById('logo').style.opacity = x/100;

        if (x == 0) Hyperspace();
    },10);
}

var lightspeed_mobile = function(event) {
    event.preventDefault();

    var circle = document.getElementById('modulus');
    var touchobj = event.changedTouches[0];
    circle.style.left = parseInt(touchobj.clientX) - 38;
    circle.style.top = parseInt(touchobj.clientY) - 38;

    var e = e || window.event || event; 
    breakthrough(e);
}

var lightspeed = function(event) {
    event.preventDefault();

    var circle = document.getElementById('modulus');
    circle.style.left = event.clientX - 38;
    circle.style.top = event.clientY - 38;

    var e = e || window.event || event; 
    if (e.which === 1) {
        breakthrough(e);
    }
}

var groundspeed = function(event) {
    document.getElementById('startTag').style.visibility = "visible";
    document.getElementById('modulus').style.visibility = "hidden";

    
    clearInterval(ticker);    
    if ( x < 0 ) x = 0;
    ticker = setInterval(function(){
        x++;
        if (38 - (Math.abs(99 - x)/10*38) < 0) { 
            document.getElementById('modulus-loader').style.r = "0px"; 
        } else {
            document.getElementById('modulus-loader').style.r = Math.round(38 - (Math.abs(99 - x)/100*38))  + "px"; 
        }
        document.getElementById('logo').style.opacity = x/100;
    },10);
}

var modulusfinder_mobile = function(event) {
    var circle = document.getElementById('modulus');
    var touchobj = event.changedTouches[0];
    circle.style.left = parseInt(touchobj.clientX) - 38;
    circle.style.top = parseInt(touchobj.clientY) - 38;
}

var modulusfinder = function(event) {
    var circle = document.getElementById('modulus');
    circle.style.left = event.clientX - 38;
    circle.style.top = event.clientY - 38;
}





//ORIENTATION = LANDSCAPE
if ( window.innerWidth > window.innerHeight ) {
}
