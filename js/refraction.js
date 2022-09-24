
//PROFILE PICTURE INITIALIZE

var ImgSize = ParentHeight*0.7,
    PicLink = $('div#imgviewport').attr('imglink'); 
$('div#imgviewport').css({
    'height':ImgSize,
    'width':ImgSize,
});
if ( $('span.mobile-device').css('display') !== 'none' ) {
    for($i=0;$i<4;$i++){
        document.getElementById('imgviewport').appendChild(document.createElement('div'));
    }
}
$('div#imgviewport').children().addClass('imgholder imgrefraction');
$('div.imgholder').each(function(){
    $(this).css({'background-image':'url('+PicLink+')'});
});
var Refractor = function(e){
    var ImgCol = document.querySelectorAll('div.imgrefraction');
    for(var h=0;h<ImgCol.length;h++){
        ImgCol[h].id = 'Nebulous'+h;
        $('div#Nebulous'+h).css({'z-index':h+1});
        var Layer = $('div#Nebulous'+h),
            Xi = e.clientX,
            Yi = e.clientY,

            $x = Layer.offset().left,
            $y = Layer.offset().left,

            c = ImgSize,
            n = -1.2*(h+1),

            XXPerc = (n*(Xi-$x-(.5*c))/c)-50,
            YYPerc = (n*(Yi-$y-(.5*c))/c)-50,

            XXDeg = -1.5*(XXPerc+50),
            YYDeg = -2*(YYPerc+50);

        Layer.css({
            '-ms-transform':'translateX('+XXPerc+'%)translateY('+YYPerc+'%)translateZ('+-3*n+'px)rotateY('+XXDeg+'deg)rotateX('+YYDeg+'deg)',
            '-webkit-transform':'translateX('+XXPerc+'%)translateY('+YYPerc+'%)translateZ('+-3*n+'px)rotateY('+XXDeg+'deg)rotateX('+YYDeg+'deg)',
            '-moz-transform':'translateX('+XXPerc+'%)translateY('+YYPerc+'%)translateZ('+-3*n+'px)rotateY('+XXDeg+'deg)rotateX('+YYDeg+'deg)',
            '-o-transform':'translateX('+XXPerc+'%)translateY('+YYPerc+'%)translateZ('+-3*n+'px)rotateY('+XXDeg+'deg)rotateX('+YYDeg+'deg)',
            'transform':'translateX('+XXPerc+'%)translateY('+YYPerc+'%)translateZ('+-3*n+'px)rotateY('+XXDeg+'deg)rotateX('+YYDeg+'deg)',
        });
    }
}
var TiltOff = function(e){
    var ImgCol = document.querySelectorAll('div.imgrefraction');
    for(var h=0;h<ImgCol.length;h++){
        ImgCol[h].id = 'Nebulous'+h;
        var Overlay = $('div#Nebulous'+h);
        Overlay.css({
            '-ms-transform':'translateX(-50%)translateY(-50%)translateZ(0px)rotateY(0deg)rotateX(0deg)',
            '-webkit-transform':'translateX(-50%)translateY(-50%)translateZ(0px)rotateY(0deg)rotateX(0deg)',
            '-moz-transform':'translateX(-50%)translateY(-50%)translateZ(0px)rotateY(0deg)rotateX(0deg)',
            '-o-transform':'translateX(-50%)translateY(-50%)translateZ(0px)rotateY(0deg)rotateX(0deg)',
            'transform':'translateX(-50%)translateY(-50%)translateZ(0px)rotateY(0deg)rotateX(0deg)',
        });
    }
} 
if ( $('span.mobile-device').css('display') !== 'none' ) {
    document.getElementById('imgviewport').addEventListener('mousemove',Refractor,false);
    document.getElementById('imgviewport').addEventListener('mouseout',TiltOff,false);
}
