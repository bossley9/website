
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

