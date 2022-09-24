
var colorR = '#d3232b';
var colorW = '#fff';
//var colorG = '#444';

center

// function courtesy of jwest, developer at Quartz
var clipPathValid = function () {
  var base = 'clipPath', prefixes = [ 'webkit', 'moz', 'ms', 'o' ], properties = [ base ], 
    testElement = document.createElement( 'testelement' ),
    attribute = 'polygon(50% 0%, 0% 100%, 100% 100%)';
    // Push the prefixed properties into the array of properties.
    for ( var i = 0, l = prefixes.length; i < l; i++ ) {
      // remember to capitalize!
      var prefixedProperty = prefixes[i] + base.charAt( 0 ).toUpperCase() + base.slice( 1 );
      properties.push( prefixedProperty );
    }
    //Interate over the properties and see if they pass two tests.
    for ( var i = 0, l = properties.length; i < l; i++ ) {
      var property = properties[i];
      // support clip-path (IE <= 11 does not)...
      if ( testElement.style[property] === '' ) {
        // create a CSS shape
        testElement.style[property] = attribute;
        if ( testElement.style[property] !== '' ) { 
          // if desktop
          if ( window.innerWidth > window.innerHeight ) {
            center = ['95%', '95%'];
            $('nav#menu-main').css({'display':'block'});
            $('nav#menu-main').css({'clip-path':'circle(0% at '+center[0]+' '+center[1]+')'});
            $('nav#menu-main').css({'-webkit-clip-path':'circle(0% at '+center[0]+' '+center[1]+')'});
          }
          return true;
        }
      }
    }
  return false;
};

clipPathValid();

//console.log(clipPathValid());

var menu = 0; var maxMenuSize; var center = [];

//console.log(menu);

function menuToggle() {
  //console.log(menu);
  menu ? menu = 0 : menu = 1;

  if(clipPathValid) {
    // if desktop / landscape mode
    if ( window.innerWidth > window.innerHeight ) {
      maxMenuSize = '100%'; center = ['95%', '95%'];
    } else {
      maxMenuSize = '130%'; center = ['50%', '95%'];
    }
    $('nav#menu-main').css({'clip-path':'circle(0% at '+center[0]+' '+center[1]+')'});
    $('nav#menu-main').css({'-webkit-clip-path':'circle(0% at '+center[0]+' '+center[1]+')'});

      //console.log('prepare opening sequence');

    if (menu) {
      //console.log('open!');
      $('nav#menu-main').css({'display':'block'});
      setTimeout( function () {
        $('div#menu-toggle').css({'color':colorW});
        $('div#plus-back').css({'background-color':colorR});
        //$('div#menu-toggle a i::after').css({'color':colorW});
        $('nav#menu-main').css({'clip-path':'circle('+maxMenuSize+' at '+center[0]+' '+center[1]+')'});
        $('nav#menu-main').css({'-webkit-clip-path':'circle('+maxMenuSize+' at '+center[0]+' '+center[1]+')'});
      },100);
    } else {
      $('div#menu-toggle').css({'color':colorR});
      $('div#plus-back').css({'background-color':colorW});
      $('nav#menu-main').css({'clip-path':'circle(0% at '+center[0]+' '+center[1]+')'});
      $('nav#menu-main').css({'-webkit-clip-path':'circle(0% at '+center[0]+' '+center[1]+')'});
    }
  } else {
    if (menu) {
      $('div#menu-toggle').css({'color':colorW});
      $('div#plus-back').css({'background-color':colorR});
      $('nav#menu-main').css({'display':'block'});
    } else {
      $('div#menu-toggle').css({'color':colorR});
      $('div#plus-back').css({'background-color':colorW});
      $('nav#menu-main').css({'display':'none'});
    }
  }
}

$('div.page').on('click', function (e) {
  menu ? menu = 0 : menu = 1;
  $('div#menu-toggle').css({'color':colorR});
  $('div#plus-back').css({'background-color':colorW});

  $('nav#menu-main').css({'clip-path':'circle(0% at '+center[0]+' '+center[1]+')'});
  $('nav#menu-main').css({'-webkit-clip-path':'circle(0% at '+center[0]+' '+center[1]+')'});
  setTimeout( function () { $('nav#menu-main').css({'display':'none'}) },200);
});

$('ol.menu-list a').on('click', function (e) {
  menu ? menu = 0 : menu = 1;
  $('div#menu-toggle').css({'color':colorR});
  $('div#plus-back').css({'background-color':colorW});

  $('nav#menu-main').css({'clip-path':'circle(0% at '+center[0]+' '+center[1]+')'});
  $('nav#menu-main').css({'-webkit-clip-path':'circle(0% at '+center[0]+' '+center[1]+')'});
  setTimeout( function () { $('nav#menu-main').css({'display':'none'}) },200);
});
