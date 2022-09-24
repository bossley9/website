
//VERIFY JAVASCRIPT ENABLED

document.documentElement.className = document.documentElement.className.replace( /(?:^|\s)no-js(?!\S)/g , '' );

//SKROLLR INITIALIZATION

  skrollr.init({
            forceHeight: false,
            mobileDeceleration: 0.004,
            smoothScrolling: true,
            smoothScrollingDuration: 100,
            easing: {
              outQuad: function (p) {
                return Math.pow(p,1/4);
              },
              outCircEst: function (p) {
                return (8/9)*Math.sqrt(p) + 1/9; 
                //I estimated and created this easing function myself...
                //without using Cubic Bezier curves this time...
                //and I'm pretty proud of it :)
              }
            }               
          });

//GOOGLE ANALYTICS

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-105760053-1', 'auto');
ga('send', 'pageview');

/*
//LOGO EXTRA ANIMATION
window.setTimeout( function () {
  $('svg#maasu-logo path:not(#innerReal):not(#outerReal), svg#maasu-logo ellipse, svg#maasu-logo circle#circleInner').animate({'opacity':'0'}, 1);
  $('path#innerReal,path#outerReal').animate({'opacity':'1'}, 1);


}, 3200 );
*/
/*
//LOGO EXTRA MOUSE PERSPECTIVE
var freshPerspective = function (e) {
  var totalHeight = $(window).height();
  var totalWidth = $(window).width();
  var centerX = totalWidth / 2;
  var centerY = totalHeight / 2;
  
  var xCoord = e.clientX; 
  var yCoord = e.clientY; 

  //console.log("("+xCoord+", "+yCoord+")");
};

document.addEventListener('mousemove', freshPerspective);
*/
